// backend.js
import express from "express";
import Services from "./services.js";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/users", (req, res) => {
    const name = req.query.name;
    Services.getUsers(name)
        .then((users) => {
            users = { users_list: users };
            res.send(users);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    Services.getUserById(id)
        .then((user) => {
            if (user === undefined) {
                res.status(404).send("User not found.");
            } else {
                res.send(user);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post("/users", (req, res) => {
    let userToAdd = req.body;
    Services.instantiateUser(userToAdd)
        .then((user) => {
            res.status(201).send(user);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
