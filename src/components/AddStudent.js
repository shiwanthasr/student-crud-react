import React, {useState} from 'react';
import {
    Button,
    Modal,
    Form
} from "react-bootstrap";

function AddStudent({inputStudentHandler, addNewStudentHandler}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
        <Button className="float-right mb-4" color="primary" onClick={handleShow}>
          Add Student
        </Button>
        <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control id="first_name" name="first_name" onChange={inputStudentHandler} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control id="last_name" name="last_name" onChange={inputStudentHandler} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control id="email" name="email" onChange={inputStudentHandler} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control id="phone" name="phone" onChange={inputStudentHandler} />
            </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Close
          </Button>
          <Button variant="primary" onClick={ addNewStudentHandler }>
            Save Changes
          </Button>
        </Modal.Footer>

        </Modal>
      </div>
    )
}

export default AddStudent;
