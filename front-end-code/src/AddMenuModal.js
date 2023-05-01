
import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddMenuModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind();
    }

    handleSubmit(event){
        //const dt = new Date();
        //let date = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'menu',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                emertimi:event.target.emertimi.value,
                nr_artikujve: event.target.nr_artikujve.value,
                pershkrimi: event.target.pershkrimi.value,
                cmimi: event.target.cmimi.value,
                restaurantID: event.target.restaurantID.value,
                pijaID: event.target.pijaID.value,
                ushqimiID: event.target.ushqimiID.value
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
       return(
           

           <div className="container">
               
                <Modal  {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto Menu
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="emertimi">
                                        <Form.Label>Emri Menu-se</Form.Label>
                                        <Form.Control type="text" name="emertimi" required 
                                        placeholder="Emri Menu-se"/>
                                    </Form.Group>
                                    <Form.Group controlId="nr_artikujve">
                                        <Form.Label>Nr i Artikujve</Form.Label>
                                        <Form.Control type="text" name="nr_artikujve" required 
                                        placeholder="nr_artikujve"/>
                                   </Form.Group>
                                   <Form.Group controlId="cmimi">
                                        <Form.Label>Cmimi</Form.Label>
                                        <Form.Control type="text" name="cmimi" required 
                                        placeholder="Cmimi"/>
                                   </Form.Group>
                                   <Form.Group controlId="pershkrimi">
                                       <Form.Label>Pershkrimi</Form.Label>
                                       <Form.Control type="text" name="pershkrimi" required
                                           placeholder="Pershkrimi" />
                                   </Form.Group>
                                   <Form.Group controlId="restaurantID">
                                       <Form.Label>Id restaurantit</Form.Label>
                                       <Form.Control type="text" name="restaurantID" required
                                           placeholder="ID e restaurantit" />
                                   </Form.Group>
                                   <Form.Group controlId="pijaID">
                                       <Form.Label>Id pija</Form.Label>
                                       <Form.Control type="text" name="pijaID" required
                                           placeholder="ID e pijes" />
                                   </Form.Group>
                                   <Form.Group controlId="ushqimiID">
                                       <Form.Label>Id e ushqimit</Form.Label>
                                       <Form.Control type="text" name="ushqimi" required
                                           placeholder="ID e ushqimit" />
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