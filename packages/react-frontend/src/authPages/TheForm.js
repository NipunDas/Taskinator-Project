// src/authPages/TheForm.js
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";

function TheForm(props) {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    }

    const submitForm = async () => {
        if (!user.username || !user.password) {
            setErrorMessage("Please enter both username and password");
            return;
        }
        try {
            //test values, get actual values from database
            const testLogin = "testUser";
            const testPassword = "testPassword";

            if (user.username === testLogin && user.password === testPassword) {
                navigate("/calendar");
            } else {
                setErrorMessage("Incorrect username and password");
                setUser({
                    username: "",
                    password: ""
                });
                console.error("Invalid username or password");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <Form>
            <Row className="align-items-center">
                <Col xs="auto">
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="align-items-center">
                <Col xs="auto">
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                            placeholder="Enter password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            {errorMessage && (
                <div
                    style={{ marginTop: "10px" }}
                    className="alert alert-danger"
                    role="alert"
                >
                    {errorMessage}
                </div>
            )}
            <div style={{ marginTop: "10px" }}>
                <Link to="/signup">
                    <Button variant="link" onClick={submitForm}>
                        Create Account
                    </Button>
                </Link>
            </div>
            <div style={{ marginTop: "10px" }}>
                <Button variant="success" onClick={submitForm}>
                    Submit
                </Button>
            </div>
        </Form>
    );
}
export default TheForm;
