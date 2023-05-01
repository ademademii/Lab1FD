import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddVleresimiModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind();
    }

    handleSubmit(event) {
        //const dt = new Date();
        //let date = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'vleresimet', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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

                <Modal  {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto vleresimin
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="vleresimi">
                                        <Form.Label>Shkruaj vleresimin</Form.Label>
                                        <Form.Control type="text" name="vleresimi" required
                                            placeholder="Vleresimi" />
                                    </Form.Group>
                                    <Form.Group controlId="menuID">
                                        <Form.Label>Id e menu-se</Form.Label>
                                        <Form.Control type="number" name="menuID" required
                                            placeholder="ID e menu" />
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