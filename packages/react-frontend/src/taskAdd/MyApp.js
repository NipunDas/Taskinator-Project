// src/MyApp.js
import React, {useState} from "react";
import TheForm from './TheForm';
import MyTable from "./MyTableHeader";


function MyApp() {
    const [characters, setCharacters] = useState([]);
      
      function removeOneCharacter (index) {
	    const updated = characters.filter((character, i) => {
	        return i !== index
	    });
	  setCharacters(updated);
	}
    
    function updateList(person) {
        setCharacters([...characters, person]);
    }
    return (
        <div className="container">
          <MyTable characterData={characters} 
              removeCharacter={removeOneCharacter} />
          <TheForm handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;