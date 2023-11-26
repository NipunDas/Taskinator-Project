import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import DragAndDropComponent from "../Grid";

const api_url = "https://taskinator-api.azurewebsites.net";

/* function postUser(person) {
    const promise = fetch(`${api_url}/users`, {
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
        const promise = fetch(`${api_url}/task-lists/65553647a73a1b75066a47ab`);
        return promise;
    }

    function deleteTask(id) {
        const promise = fetch(
            `${api_url}/task-lists/65553647a73a1b75066a47ab/tasks/${id}`,
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

    function updateTask(task, newListId) {
        // Convert newListId to the corresponding numerical value
        const listIdMap = {
            high: 1,
            medium: 2,
            low: 3
        };

        const numericListId = listIdMap[newListId];

        // Prepare the task data to be sent in the request body
        const taskData = {
            name: task.name,
            description: task.description,
            tags: task.tags,
            priority: numericListId,
            _id: task.id,
        };

        console.log("DATAAA SENT");
        console.log(JSON.stringify(taskData));

        const promise = fetch(
            `${api_url}/task-lists/65553647a73a1b75066a47ab/tasks`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            }
        );

        return promise;
    }

    function onTaskMove(task, newListId) {
        console.log(`Card with ID ${task.id} moved to ${newListId}`);

        // console.log(taskId);

        updateTask(task, newListId)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);

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
            })
            .catch((error) => console.error('Error:', error));
    }

    function filterTasks() {
        var value = document.getElementById("filter").value;
        if (value !== "All") {
            filteredTasks = tasks.filter((task) => task.tags.includes(value));

            setFilteredTasks(filteredTasks);
        } else {
            filteredTasks = tasks;
            setFilteredTasks(filteredTasks);

            console.log("GET NEW FILTERED DATA");
            console.log(filteredTasks);
        }
    }

    useEffect(() => {
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
            <DragAndDropComponent
                taskData={filteredTasks}
                updateTask={onTaskMove}
                removeTask={removeTask}
            ></DragAndDropComponent>
            <Row className="mt-4">
                <Col>
                    <Link to="/taskAdd">
                        <Button variant="success">Add New Task</Button>
                    </Link>
                </Col>
                <Col>
                    <div>
                        <Link to="/">
                            <Button variant="success">Back to calendar</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default MyTaskList;
