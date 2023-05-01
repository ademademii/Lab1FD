import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditPijaModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log(event.target.id.value)
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'pija', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pijaID: event.target.pijaID.value,
                emri: event.target.emri.value,
                sasiaPijeve: event.target.sasiaPijeve.value
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
                            Edit Pijen
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="pijaID">
                                        <Form.Label>Id e pijes</Form.Label>
                                        <Form.Control type="number" name="pijaID" required disabled
                                            defaultValue={this.props.pijaID}
                                            placeholder="ID" />
                                    </Form.Group>
                                    <Form.Group controlId="emri">
                                        <Form.Label>Emri</Form.Label>
                                        <Form.Control type="text" name="emri" required
                                            defaultValue={this.props.emri}
                                            placeholder="emri" />
                                    </Form.Group>
                                    <Form.Group controlId="sasiaPijeve">
                                        <Form.Label>Sasia e disponueshme</Form.Label>
                                        <Form.Control type="number" name="sasiaPijeve" required
                                            defaultValue={this.props.sasiaPijeve}
                                            placeholder="Sasia" />
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