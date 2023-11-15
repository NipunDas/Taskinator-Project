import React from "react";
import ReactDOMClient from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "./index.css";

function MyApp() {
    return (
        <div>
            <Button>works</Button>
            <h1>Hello, React!</h1>
        </div>
    );
}

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render(<MyApp />);
