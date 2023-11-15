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
            if (user === null) {
                res.status(404).send("User not found.");
            } else {
                res.send(user);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(404).send("User not found.");
        });
});

app.get("/task-lists/:id", (req, res) => {
    const id = req.params.id;
    Services.getTaskListById(id)
        .then((taskList) => {
            if (taskList === null) {
                res.status(404).send("Task list not found.");
            } else {
                res.send(taskList);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(404).send("Task list not found");
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

app.post("/task-lists/:id/tasks", (req, res) => {
    const id = req.params.id;
    const task = req.body;
    /* Getting task list's ID from user, updating task list */
    Services.addTask(id, task)
        .then((new_task) => {
            if (task === null) {
                res.status(404).send("Task list not found.");
            } else {
                res.status(201).send(new_task);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

app.put("/task-lists/:id/tasks", (req, res) => {
    const taskList_id = req.params.id;
    const task = req.body;
    Services.editTask(taskList_id, task)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.delete("/task-lists/:id/tasks/:taskid", (req, res) => {
    const taskList_id = req.params.id;
    const task_id = req.params.taskid;
    Services.deleteTask(taskList_id, task_id)
        .then((task) => {
            if (task === null) {
                res.status(404).send("Task list not found.");
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    Services.deleteUserById(id)
        .then((user) => {
            if (user === null) {
                res.status(404).send("User not found.");
            } else {
                Services.deleteTaskListById(user.taskList)
                    .then((list) => {
                        if (list === null) {
                            res.status(404).send("User's task list not found.");
                        } else {
                            res.status(204).send();
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(404).send("User's task list not found.");
                    });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(404).send("User not found.");
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
