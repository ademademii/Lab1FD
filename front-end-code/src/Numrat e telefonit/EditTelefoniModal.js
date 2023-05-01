import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditTelefoniModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log(event.target.id.value)
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'telefoni', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numri: event.target.numri.value,
                nr_tel: event.target.nr_tel.value,
                userId: event.target.userId.value
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
                            Edit Numrin e telefonit
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="numri">
                                        <Form.Label>Id e numrit</Form.Label>
                                        <Form.Control type="number" name="numri" required disabled
                                            defaultValue={this.props.numri}
                                            placeholder="ID" />
                                    </Form.Group>
                                    <Form.Group controlId="nr_tel">
                                        <Form.Label>Numri i telefonit</Form.Label>
                                        <Form.Control type="number" name="nr_Tel" required
                                            defaultValue={this.props.nr_tel}
                                            placeholder="numri i telefonit" />
                                    </Form.Group>
                                    <Form.Group controlId="userId">
                                        <Form.Label>Id e perdoruesit</Form.Label>
                                        <Form.Control type="text" name="userId" required
                                            defaultValue={this.props.userId}
                                            placeholder="Id e userit" />
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