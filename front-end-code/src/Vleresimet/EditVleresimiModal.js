import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditVleresimiModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log(event.target.id.value)
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'vleresimet', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vleresimiID: event.target.vleresimiID.value,
                vleresimi: event.target.vleresimi.value,
                menuID: event.target.menuID.value
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
                            Edit vleresimin
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="vleresimiID">
                                        <Form.Label>Id e vleresimit</Form.Label>
                                        <Form.Control type="number" name="vleresimiID" required disabled
                                            defaultValue={this.props.vleresimiID}
                                            placeholder="ID" />
                                    </Form.Group>
                                    <Form.Group controlId="vleresimi">
                                        <Form.Label>vleresimi</Form.Label>
                                        <Form.Control type="text" name="vleresimi" required
                                            defaultValue={this.props.vleresimi}
                                            placeholder="vleresimi" />
                                    </Form.Group>
                                    <Form.Group controlId="menuID">
                                        <Form.Label>Id e menu</Form.Label>
                                        <Form.Control type="number" name="menuID" required
                                            defaultValue={this.props.menuID}
                                            placeholder="Id e menu" />
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