# Taskinator-Project

Taskinator is a To-Do list web application created for the CSC 307 Software Engineering class. The
vision of the app is to create a tool to help students (and other people) with a lot of work to manage
all of their tasks. Taskinator accomplishes this through a combination of a To-Do list and a calendar.
The app allows users to create tasks with fields such as title, description, priority, tags, date, and
duration. These tasks are sorted by priority, and custom filters are provided through tags. Tasks can
also be dragged around to switch priority and can also be deleted from the task list page. Additionally,
since many events and tasks occur on a periodic basis (ex. every Monday or Wednesday, or every other
day), the app allows for users to specify task periodicity, which conveniently displays on the calendar.

# Delevopment Environment Setup

This project uses the npm package manager, along with Node and Express.js for the backend server and
React for the frontend framework. To begin contributing to this project, you will need to clone this
repository, and obtain dependencies by running the following npm command:

`npm ci`

Additionally, a .env file is needed for hosting the backend server locally. The frontend can be
hosted without the backend as it uses the deployed backend (which backend is used is controlled in
the Consts.js file in the react-frontend package), but if you want to host the backend locally,
you will need the .env file, which allows for connecting to MongoDB and generating access tokens
with JWT.

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

## Keeping up with dependencies

There are a lot of dependencies listed below in this README, and not all dependencies used in this project will be stated in this file. You can check the dependencies used for each workspace and the overall project by looking at the respective package.json files, but an easier way to make sure you have the latest versions of all dependencies is to run the following command:

`npm update`

# Important Links

[Website Link (Frontend)](https://lively-sand-0ad511b1e.4.azurestaticapps.net)

[Backend API Link](https://taskinator-api.azurewebsites.net)

Backend API routes are documented in the [Backend.md]() file under the express-backend workspace.

# UI Prototype

Here is the [link](https://www.figma.com/file/0qjYsQfQd4AnZRIzev1sJd/Untitled?type=design&node-id=0%3A1&
mode=design&t=2kch2TmWeG3cMtrv-1) to the UI prototype for this project, designed in Figma.

# UML Class Diagram

Here is the [link]() to the UML class diagram, which documents how persistent data is stored on the
backend.

# Authentication

Here is the [link]() to the backend authentication sequence diagram, which outlines how authentication
is done for this app.

# Connecting to the cloud database

To host the backend server locally, you will need to connect to the cloud database. You need a .env file with the environment variables `MONGODB_URI`, for the backend server to connect to the database, and `COMPASS_URI`, which you can put into MongoDB Compass to connect to the cloud database and access the data in Compass. The .env file should be put in the root of the express-backend package, and should not be checked into git. For the `MONGODB_URI` environment variable to be read, run the following command to install the dotenv package.

`npm install dotenv`

# Installing Bootstrap

You can install React-Bootstrap via npm or yarn (Install in the react-frontend package).

Using npm:

`npm install react-bootstrap bootstrap`

[Components](https://react-bootstrap.netlify.app/docs/components/accordion) can be imported within a JavaScript file like this:

`import Button from 'react-bootstrap/Button';`

# CORS dependency

CORS is a required dependency for the front end to access the cloud database. Run this command on the root of the project to install

`npm install cors`

# Installing React Router

`npm install react-router-dom`
