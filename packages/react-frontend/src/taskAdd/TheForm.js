// src/Form.js
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function TheForm(props) {
  const [person, setPerson] = useState(
     {
        title: "",
        description: "",
        priority: "",
        tags: "",
        date: "",
        duration: "",
     }
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  }

  
  const submitForm = async () => {
    try {
      const response = await fetch('http://localhost:8000/task-lists/65553647a73a1b75066a47ab/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
      });

      if (response.status === 201) {
        const newUser = await response.json();
        props.handleSubmit(newUser);
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }

    // Reset the form after submission
    setPerson({
      title: '',
      description: '',
      priority: '',
      tags: '',
      date: '',
      duration: '',
    });
  };

  return (
    <Form>
      <Form.Group controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter title"
          value={person.title}
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
          type="text"
          name="date"
          placeholder="Enter date"
          value={person.date}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDuration">
        <Form.Label>Duration</Form.Label>
        <Form.Control
          type="text"
          name="duration"
          placeholder="Enter duration"
          value={person.duration}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" onClick={submitForm}>
        Submit
      </Button>
    </Form>
  );
}
export default TheForm;