# Taskinator-Project

Taskinator is a To-Do list web application created for the CSC 307 Software Engineering class.

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

# Installing Bootstrap
You can install React-Bootstrap via npm or yarn (Install in react-frontend package).

Using npm:

`npm install react-bootstrap bootstrap`

[Components](https://react-bootstrap.netlify.app/docs/components/accordion) can be imported within file like this

`import Button from 'react-bootstrap/Button';`
