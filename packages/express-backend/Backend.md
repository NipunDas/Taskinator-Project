# Backend Setup with MongoDB database and Express.js API

See instructions in the README.md file in the root of this project for setting up the project to access the cloud database. Start the Express.js server with this command in the root of the express-backend package:

`npx nodemon src/backend.js`

The following routes can be used to create and manipulate users/tasklists (on top of the base URL
http://localhost:3000 or the deployed API on Azure). Note that all routes besides /signup and /login
are protected since they contain sensitive user data, and the generated JWT token returned by the signup
or login routes is needed to access any other routes.

`POST /signup`

Creates a new user by registering them. The request body must specify the user's name, username, and
password. Responds with a JWT token upon success, which can be used to access protected routes.

`POST /login`

Attempts to log in an existing user. The request body must specify the user's name and password. Responds
with a JWT token upon success, which can be used to access protected routes.

`GET /users`

Returns a list of all users, with references to corresponding task lists. You
can use "name" as a query parameter if needed.

`GET /users/:id`

Gets a user by its ID.

`GET /task-lists/:id`

Gets a task list by its ID.

`POST /users`

Create a new user and a corresponding task list. The user's name must be
specified in the request body.

`POST /task-lists/:id/tasks`

Create a new task under the task list with the given ID. The request body must
specify the task's name and priority, although it can specify more if needed
(see the schema for more fields).

`PUT /task-lists/:id/tasks`

Replaces a task in the given task list with the new task specified in the
request body. The request body should contain the complete new task, including
the \_id field, so that the task to be replaced can be found.

`DELETE /task-lists/:id/tasks/:taskid`

Deletes the specified task from the specified task list.

`DELETE /users/:id`

Delete the specified user and their corresponding task list.
