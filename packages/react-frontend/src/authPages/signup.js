// src/MyApp.js
import React, { useState } from "react";
import SignupForm from "./signupForm.js";

function Signup() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }

    function updateList(person) {
        setCharacters([...characters, person]);
    }
    return (
        <div className="container">
            <SignupForm handleSubmit={updateList} />
        </div>
    );
}

export default Signup;
