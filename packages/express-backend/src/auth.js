import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const creds = []; // For now storing credentials in an array, move to database later

/* Registers a user by validating input (making sure username and password are defined), and username
   isn't already taken, then using bcrypt to encrypt the password. generateAccessToken() then provides
   a token that can be used to access protected routes */
export function registerUser(req, res) {
    const { username, pwd } = req.body;

    if (!username || !pwd) {
        res.status(400).send("Bad request: Invalid input data.");
    } else if (creds.find((c) => c.username === username)) {
        res.status(409).send("Username already taken.");
    } else {
        bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(pwd, salt))
            .then((hashedPassword) => {
                generateAccessToken(username).then((token) => {
                    console.log("Token: ", token);
                    res.status(201).send({ token: token });
                    creds.push({ username, hashedPassword });
                });
            });
    }
}

/* Uses jwt to generate an access token for the user. This access token ensures that routes that could
   contain sensitive data are only accessed by authenticated users */
function generateAccessToken(username) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { username: username },
            process.env.TOKEN_SECRET,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
    });
}

/* Verifies the provided token to ensure that the user trying to access a protected route is using 
   a valid token */
export function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    // Getting the second part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("No token received.");
        res.status(401).send();
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
            if (decoded) {
                next();
            } else {
                console.log("JWT Error:", error);
                res.status(401).end();
            }
        });
    }
}

/* Logs in an already existing user. Similar to registerUser(), but since the user already exists,
   the function uses bcrypt to encrpt the given password and compare it to the already encrypted
   password stored in teh database. If these match, an access token is provided in the response body
   */
export function loginUser(req, res) {
    const { username, pwd } = req.body; // from form
    const retrievedUser = creds.find((c) => c.username === username);

    if (!retrievedUser) {
        res.status(401).send("Unauthorized");
    } else {
        bcrypt
            .compare(pwd, retrievedUser.hashedPassword)
            .then((matched) => {
                if (matched) {
                    generateAccessToken(username).then((token) => {
                        res.status(200).send({ token: token });
                    });
                } else {
                    // invalid password
                    res.status(401).send("Unauthorized");
                }
            })
            .catch(() => {
                res.status(401).send("Unauthorized");
            });
    }
}
