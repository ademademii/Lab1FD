import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditUshqimiModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log(event.target.id.value)
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'ushqimi', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ushqimiID: event.target.ushqimiID.value,
                emri: event.target.emri.value,
                sasiaDisponueshme: event.target.sasiaDisponueshme.value
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
                            Edit Ushqimin
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ushqimiID">
                                        <Form.Label>Id e ushqimit</Form.Label>
                                        <Form.Control type="number" name="ushqimiID" required disabled
                                            defaultValue={this.props.ushqimiID}
                                            placeholder="ID" />
                                    </Form.Group>
                                    <Form.Group controlId="emri">
                                        <Form.Label>Emri</Form.Label>
                                        <Form.Control type="text" name="emri" required
                                            defaultValue={this.props.emri}
                                            placeholder="emri" />
                                    </Form.Group>
                                    <Form.Group controlId="sasiaDisponueshme">
                                        <Form.Label>Sasia e disponueshme</Form.Label>
                                        <Form.Control type="number" name="sasiaDisponueshme" required
                                            defaultValue={this.props.sasiaDisponueshme}
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