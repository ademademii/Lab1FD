import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditRoleModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log(event.target.id.value)
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'role', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roliID: event.target.roliID.value,
                role: event.target.role.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                })
    }
    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Rolin
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="roliID">
                                        <Form.Label>Id e rolit</Form.Label>
                                        <Form.Control type="text" name="roliID" required disabled
                                            defaultValue={this.props.roliID}
                                            placeholder="id" />
                                    </Form.Group>
                                    <Form.Group controlId="role">
                                        <Form.Label>Lloji i rolit</Form.Label>
                                        <Form.Control type="text" name="role" required
                                            defaultValue={this.props.role}
                                            placeholder="role" />
                                    </Form.Group>

                        
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}