import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddUshqimiModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind();
    }

    handleSubmit(event) {
        //const dt = new Date();
        //let date = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'ushqimi', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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

                <Modal  {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto Ushqimin
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="emri">
                                        <Form.Label>Emri i ushqimit</Form.Label>
                                        <Form.Control type="text" name="emri" required
                                            placeholder="Emri i ushqimit" />
                                    </Form.Group>
                                    <Form.Group controlId="sasiaDisponueshme">
                                        <Form.Label>Sasia e disponueshme</Form.Label>
                                        <Form.Control type="number" name="sasiaDisponueshme" required
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