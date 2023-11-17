import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

/* function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person)
    });

    return promise
  } */

/*   function addCharacter(person) {
    postUser(person)
      .then((res) => res.status === 201 ? res.json() : undefined)
      .then((json) => { if (json) setCharacters([...characters, json]); characters = [...characters, json];
       })
      .catch((error) => console.log(error));
      sleep(500).then(() => { filterCharacters(); });
  } */

function MyTaskList() {
    var [tasks, setTasks] = useState([]);
    var [filteredTasks, setFilteredTasks] = useState([]);

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function fetchTasks() {
        const promise = fetch(
            "http://localhost:8000/task-lists/65553647a73a1b75066a47ab"
        );
        console.log(promise);
        return promise;
    }

    function deleteTask(id) {
        const promise = fetch(
            `http://localhost:8000/task-lists/65553647a73a1b75066a47ab/tasks/${id}`,
            {
                method: "DELETE"
            }
        );

        return promise;
    }

    function removeTask(id) {
        deleteTask(id)
            .then((res) => {
                if (res.status === 204) console.log("inside");
                tasks = tasks.filter((task, i) => task._id !== id);
                setTasks(tasks);
            })
            .catch((error) => console.log(error));
        sleep(500).then(() => {
            filterTasks();
        });
    }

    function filterTasks() {
        var value = document.getElementById("filter").value;
        console.log(value);
        if (value !== "All") {
            filteredTasks = tasks.filter((task) => task.tags.includes(value));
            setFilteredTasks(filteredTasks);
            console.log(filteredTasks);
        } else {
            filteredTasks = tasks;
            setFilteredTasks(filteredTasks);
            console.log(filteredTasks);
        }
    }

    useEffect(() => {
        console.log("hi");
        fetchTasks()
            .then((res) => res.json())
            .then((json) => setTasks(json["tasks"]))
            .catch((error) => {
                console.log(error);
            });
        fetchTasks()
            .then((res) => res.json())
            .then((json) => setFilteredTasks(json["tasks"]))
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1 className="p-2">To Do List</h1>
            <label htmlFor="filter">Filter</label>
            <select name="filter" id="filter" onChange={filterTasks}>
                <option value="All">All Items</option>
                <option value="School">School</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
            </select>
            <Grid
                name="High Priority"
                id={1}
                taskData={filteredTasks}
                removeTask={removeTask}
            ></Grid>
            <Grid
                name="Medium Priority"
                id={2}
                taskData={filteredTasks}
                removeTask={removeTask}
            ></Grid>
            <Grid
                name="Low Priority"
                id={3}
                taskData={filteredTasks}
                removeTask={removeTask}
            ></Grid>
            <Row className="mt-4">
                <Col>
                <Link to="/taskAdd">
            <Button variant="success">Add New Task</Button>
          </Link>
                </Col>
            </Row>
        </div>
    );
}

export default MyTaskList;
