// src/MyApp.js
import React, { useState } from "react";
import TheForm from "./TheForm.js";

function Login() {
    const [characters, setCharacters] = useState([]);

    function updateList(person) {
        setCharacters([...characters, person]);
    }
    return (
        <div className="container">
            <TheForm handleSubmit={updateList} />
        </div>
    );
}

export default Login;
