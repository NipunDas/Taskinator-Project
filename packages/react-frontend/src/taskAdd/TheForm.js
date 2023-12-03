// src/Form.js
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const api_url = "https://taskinator-api.azurewebsites.net";

function TheForm(props) {
    const [person, setPerson] = useState({
        name: "",
        description: "",
        priority: "",
        tags: "",
        date: "",
        duration: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setPerson((prevPerson) => ({
            ...prevPerson,
            [name]: value
        }));
    }

    const onSave = () =>{
        // Check if name is given
        if (person.name === "") {
            alert("Please give a name for the task.");
            return;
        }
        // Check if priority is selected
        if (person.description === "") {
            alert("Please give a description for the task.");
            return;
        }
        // Check if priority is selected
        if (person.priority === "") {
            alert("Please select a priority for the task.");
            return;
        }
        // Check if priority is selected
        if (person.date === "") {
            alert("Please select a date for the task.");
            return;
        }
        // Check if priority is selected
        if (person.duration === "") {
            alert("Please select a duration for the task.");
            return;
        }
        submitForm()
    }

    function fetchTasks() {
        const promise = fetch(`${api_url}/task-lists/65553647a73a1b75066a47ab`);
        return promise;
    }


    async function validateTask() {
        try {
            const res = await fetchTasks();
            const json = await res.json(); // Wait for the promise from res.json() to resolve

            if (!json.tasks || !Array.isArray(json.tasks)) {
                console.error("Tasks is not an array or undefined");
                return false;
            }

            const newTaskStartTime = new Date(person.date);
            const newTaskEndTime = new Date(person.date);
            newTaskEndTime.setMinutes(newTaskEndTime.getMinutes() + parseInt(person.duration));

            for (let task of json.tasks) {
                if (task.date) {
                    const taskStartTime = new Date(task.date);
                    const taskEndTime = new Date(task.date);
                    taskEndTime.setMinutes(taskEndTime.getMinutes() + parseInt(task.duration));

                    // Check for overlap with other tasks
                    if (newTaskStartTime < taskEndTime && newTaskEndTime > taskStartTime) {
                        console.log("taskname: ", task);
                        return true; // Conflict found
                    }
                }
            }
            return false;
        } catch (error) {
            console.error("Error in validateTask: ", error);
            return false;
        }
    }





    const submitForm = async () => {
        console.log("PERSON:  ");
        console.log( person);

        person.date = new Date(person.date);


        try {
            const timeConflict = await validateTask(); // Wait for the promise
            console.log("TIMECONFLICT");
            console.log(timeConflict);
            if (timeConflict) {
                alert("Time conflict");
            }
            else {
                try {
                    const response = await fetch(
                        `${api_url}/task-lists/65553647a73a1b75066a47ab/tasks`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(person)
                        }
                    );

                    if (response.status === 201) {
                        const newUser = await response.json();
                        props.handleSubmit(newUser);
                    } else if (response.status === 409) {
                        console.log("Time conflict");
                        alert("Time conflict");
                        return;
                    } else {
                        console.error("Failed to add user");
                    }
                } catch (error) {
                    console.error("Error adding user:", error);
                }


                // Reset the form after submission
                setPerson({
                    name: "",
                    description: "",
                    priority: "",
                    tags: "",
                    date: "",
                    duration: ""
                });
            }
        }catch (error) {
            console.error("Error during form submission", error);
        }
    };



    return (
        <Form>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    maxLength="28"
                    value={person.name}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    maxLength="80"
                    value={person.description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formBasicTags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                    type="text"
                    name="tags"
                    placeholder="Enter tags"
                    value={person.tags}
                    maxLength="50"
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control as="select" name="priority" value={person.priority} onChange={handleChange}>
                    <option value="">Select Priority</option>
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                </Form.Control>
            </Form.Group>


            <Form.Group controlId="formBasicDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="datetime-local"
                    name="date"
                    placeholder="Enter date"
                    value={person.date}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formBasicDuration">
                <Form.Label>Duration (In Minutes) </Form.Label>
                <Form.Control
                    type="text"
                    name="duration"
                    placeholder="Enter duration"
                    maxLength="5"
                    value={person.duration}
                    onChange={handleChange}
                />
            </Form.Group>

            <div style={{ marginBottom: "10px" }}>
                <Button variant="primary" onClick={onSave}>
                    Submit
                </Button>
            </div>
            <div>
                <Link to="/taskList">
                    <Button variant="success">Back to task list</Button>
                </Link>
            </div>
        </Form>
    );
}
export default TheForm;
