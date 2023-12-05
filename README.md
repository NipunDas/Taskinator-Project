# Taskinator-Project

Taskinator is a To-Do list web application created for the CSC 307 Software Engineering class.

# Important Links

[Website Link (Frontend)](https://lively-sand-0ad511b1e.4.azurestaticapps.net)

[Backend API Link](https://taskinator-api.azurewebsites.net)

Backend API routes are documented in the Backend.md file under the express-backend workspace.

# Contributing

To maintain consistent coding standards and formatting, this project is set up with the
Prettier code formatter. Configuration files are already included in this repository, but there
is some setup that needs to be done. In the top level of this project, run the following command
to install Prettier, along with other dependencies to make the formatting automatic:

`npm install --save husky lint-staged prettier`

Now, with the configurations in the package.json file, Prettier should automatically reformat files
when files are committed. Additionally, you can format the file yourself through the terminal by
running the following npm script:git

`npm run format`

It can also be convenient to have the formatter work within your editor. To see how to integrate
Prettier into your editor, take a look at [this link](https://prettier.io/docs/en/editors.html).
On VSCode specifically, you can configure the editor to format your code when saving by following
the [instructions here](https://blog.yogeshchavan.dev/automatically-format-code-on-file-save-in-visual-studio-code-using-prettier).

There are a lot of dependencies listed below in this README, and not all dependencies used in this project will be stated in this file. You can check the dependencies used for each workspace and the overall project by looking at the respective package.json files, but an easier way to make sure you have the latest versions of all dependencies is to run the following command:

`npm update`

# Installing Bootstrap

You can install React-Bootstrap via npm or yarn (Install in the react-frontend package).

Using npm:

`npm install react-bootstrap bootstrap`

[Components](https://react-bootstrap.netlify.app/docs/components/accordion) can be imported within a JavaScript file like this:

`import Button from 'react-bootstrap/Button';`

# Connecting to the cloud database

To host the backend server locally, you will need to connect to the cloud database. You need a .env file with the environment variables `MONGODB_URI`, for the backend server to connect to the database, and `COMPASS_URI`, which you can put into MongoDB Compass to connect to the cloud database and access the data in Compass. The .env file should be put in the root of the express-backend package, and should not be checked into git. For the `MONGODB_URI` environment variable to be read, run the following command to install the dotenv package.

`npm install dotenv`

# CORS dependency

CORS is a required dependency for the front end to access the cloud database. Run this command on the root of the project to install

`npm instsall cors`

# Installing React Router

`npm install react-router-dom`
