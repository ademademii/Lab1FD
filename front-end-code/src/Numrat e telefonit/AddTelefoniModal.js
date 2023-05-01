import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddTelefoniModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind();
    }

    handleSubmit(event) {
        //const dt = new Date();
        //let date = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'telefoni', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: event.target.userId.value,
                nr_tel: event.target.nr_tel.value
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
                            Shto numrin e telefonit
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="userId">
                                        <Form.Label>Id e userit</Form.Label>
                                        <Form.Control type="text" name="userId" required
                                            placeholder="user id" />
                                    </Form.Group>
                                    <Form.Group controlId="nr_tel">
                                        <Form.Label>Numri i telefonit</Form.Label>
                                        <Form.Control type="number" name="nr_tel" required
                                            placeholder="Numri i tel" />
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