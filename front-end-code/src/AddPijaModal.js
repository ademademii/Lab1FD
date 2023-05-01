import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddPijaModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind();
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'pija', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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

                <Modal  {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto Pije
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="emri">
                                        <Form.Label>Emri i pijes</Form.Label>
                                        <Form.Control type="text" name="emri" required
                                            placeholder="Emri i pijes" />
                                    </Form.Group>
                                    <Form.Group controlId="sasiaPijeve">
                                        <Form.Label>Sasia e disponueshme</Form.Label>
                                        <Form.Control type="text" name="sasiaPijeve" required
                                            placeholder="Sasia" />
                                    </Form.Group>
                                    
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Shto
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