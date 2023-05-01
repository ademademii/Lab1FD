import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditRestorantModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        console.log(event.target.id.value)
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'restaurant' ,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                restaurantID: event.target.restaurantID.value,
                emri: event.target.emri.value,
                data_regjistrimit: event.target.data_regjistrimit.value,
                nrYjeve: event.target.nrYjeve.value,
                foto:event.target.foto.value,
                pershkrimi:event.target.pershkrimi.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
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
                            Edito Restorantin
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="restaurantID">
                                        <Form.Label>Id e restaurantit</Form.Label>
                                        <Form.Control type="text" name="restaurantID" required disabled
                                            defaultValue={this.props.restaurantID}
                                        placeholder="restaurantID"/>
                                    </Form.Group>
                                    <Form.Group controlId="emri">
                                        <Form.Label>Emri Restorantit</Form.Label>
                                        <Form.Control type="text" name="emri" required 
                                        defaultValue={this.props.emri}
                                        placeholder="emri"/>
                                    </Form.Group>

                                    <Form.Group controlId="data_regjistrimit">
                                        <Form.Label>Data e regjistrimit</Form.Label>
                                        <Form.Control type="text" name="data_regjistrimit" required
                                            defaultValue={this.props.data_regjistrimit}
                                        placeholder="data e regjistrimit"/>
                                    </Form.Group>

                                    <Form.Group controlId="nrYjeve">
                                        <Form.Label>Numri i yjeve</Form.Label>
                                        <Form.Control type="text" name="nrYjeve" required 
                                        defaultValue={this.props.nrYjeve}
                                        placeholder="Numri i yjeve"/>
                                    </Form.Group>

                                    <Form.Group controlId="foto">
                                        <Form.Label>Foto</Form.Label>
                                        <Form.Control type="text" name="foto" required 
                                        defaultValue={this.props.foto}
                                        placeholder="Foto"/>
                                    </Form.Group>

                                    <Form.Group controlId="pershkrimi">
                                        <Form.Label>Pershkrimi</Form.Label>
                                        <Form.Control type="text" name="pershkrimi" required 
                                        defaultValue={this.props.pershkrimi}
                                        placeholder="Pershkrimi"/>
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