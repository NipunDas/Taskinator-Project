// src/MyApp.js
import React from "react";
import TheForm from "./TheForm";
import MyTable from "./MyTableHeader";

function MyAddTask(props) {
    return (
        <div className="container">
            <MyTable />
            <TheForm addHeader={props.addHeader} taskList={props.taskList} />
        </div>
    );
}

export default MyAddTask;
