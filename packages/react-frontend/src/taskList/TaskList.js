import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import DragAndDropComponent from "./Grid";
import { API_URL } from "../Consts.js";

/* function postUser(person) {
    const promise = fetch(`${API_URL}/users`, {
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

function MyTaskList(props) {
    var [tasks, setTasks] = useState([]);
    var [filteredTasks, setFilteredTasks] = useState([]);
    // updateList's value is arbitrary, just used to run useEffect
    var [updateList, setUpdateList] = useState(false);
    const taskList = props.taskList;
    const addHeader = props.addHeader;

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function deleteTask(id) {
        const promise = fetch(`${API_URL}/task-lists/${taskList}/tasks/${id}`, {
            method: "DELETE",
            headers: addHeader()
        });
        return promise;
    }

    function removeTask(id) {
        deleteTask(id)
            .then((res) => {
                if (res.status === 204) console.log("inside");
                setUpdateList(!updateList);
                /*
                Old code: just call the API again instead
                tasks = tasks.filter((task, i) => task._id !== id);
                setTasks(tasks);
                */
            })
            .catch((error) => console.log(error));
        sleep(500).then(() => {
            filterTasks();
        });
    }

    function updateTask(task, newListId) {
        const listIdMap = {
            high: 1,
            medium: 2,
            low: 3
        };

        const numericListId = listIdMap[newListId];

        const taskData = {
            name: task.name,
            description: task.description,
            tags: task.tags,
            priority: numericListId,
            _id: task.id
        };

        const promise = fetch(`${API_URL}/task-lists/${props.taskList}/tasks`, {
            method: "PUT",
            headers: props.addHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(taskData)
        });

        return promise;
    }

    function onTaskMove(task, newListId) {
        updateTask(task, newListId)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((_data) => {
                setUpdateList(!updateList);
            })
            .catch((error) => console.error("Error:", error));
    }

    function filterTasks() {
        var value = document.getElementById("filter").value;
        if (value !== "All") {
            filteredTasks = tasks.filter((task) => task.tags.includes(value));
            setFilteredTasks(filteredTasks);
        } else {
            filteredTasks = tasks;
            setFilteredTasks(filteredTasks);
        }
    }

    useEffect(() => {
        function fetchTasks() {
            console.log("testinggggg");
            const promise = fetch(`${API_URL}/task-lists/${taskList}`, {
                headers: addHeader()
            });
            return promise;
        }

        fetchTasks()
            .then((res) => res.json())
            .then((json) => {
                setTasks(json["tasks"]);
                setFilteredTasks(json["tasks"]);
            })
            .catch((error) => {
                console.log(error);
                setTasks(null);
                setFilteredTasks(null);
            });
    }, [taskList, addHeader, updateList]);

    if (!tasks || !filteredTasks) {
        return <caption>Data Unavailable</caption>;
    }

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
                        <Link to="/calendar">
                            <Button variant="success">Back to calendar</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default MyTaskList;
