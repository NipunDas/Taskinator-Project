// src/Form.js
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

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

    const submitForm = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/task-lists/65553647a73a1b75066a47ab/tasks",
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
    };

    return (
        <Form>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
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
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                    type="text"
                    name="priority"
                    placeholder="Enter priority"
                    value={person.priority}
                    onChange={handleChange}
                />
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
                    value={person.duration}
                    onChange={handleChange}
                />
            </Form.Group>

            <div style={{ marginBottom: "10px" }}>
                <Button variant="primary" onClick={submitForm}>
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
