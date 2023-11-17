import React from "react";
import ReactDOMClient from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import MyAddTask from "./taskAdd/MyApp";
import MyApp from "./taskList/MyApp";
import MyCalendar from "./MyApp";



// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render(<MyCalendar />);
