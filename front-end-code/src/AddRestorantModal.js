
import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddRestorantModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind();
       // this.state = { qytetet: [], addModalShow: false }
    }


  /* refreshList() {
        fetch(process.env.REACT_APP_API + 'qyteti')
            .then(response => response.json())
            .then(data => {
                this.setState({ qytetet: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }*/

    handleSubmit(event) {
        event.preventDefault();

        fetch(process.env.REACT_APP_API + 'restaurant', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emri: event.target.emri.value,
                data_regjistrimit: event.target.data_regjistrimit.value,
                nrYjeve: event.target.nrYjeve.value,
                foto: event.target.foto.value,
                pershkrimi: event.target.pershkrimi.value,
                qytetiID: event.target.qytetiID.value
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
       // const { qytetet, qytetiID, emri } = this.state;
            return(
                <div className="container">
               
                    <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Shto Restorantin
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Row>
                                <Col sm={6}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="emri">
                                            <Form.Label>Emri Restorantit</Form.Label>
                                            <Form.Control type="text" name="emri" required 
                                            placeholder="Emri Restorantit"/>
                                        </Form.Group>
                                        <Form.Group controlId="data_regjistrimit">
                                            <Form.Label>Data e regjistrimit</Form.Label>
                                            <Form.Control type="date" name="data_regjistrimit" required 
                                            placeholder="Data e regjistrimit"/>
                                        </Form.Group>
                                        <Form.Group controlId="nrYjeve">
                                            <Form.Label>Numri i yjeve</Form.Label>
                                            <Form.Control as="select" name="nrYjeve" required placeholder="Numri i yjeve">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="foto">
                                            <Form.Label>Foto</Form.Label>
                                            <Form.Control type="file" name="foto" required 
                                            placeholder="Foto"/>
                                        </Form.Group>

                                        <Form.Group controlId="pershkrimi">
                                            <Form.Label>Pershkrimi i restaurantit</Form.Label>
                                            <Form.Control type="text" name="pershkrimi" required 
                                            placeholder="Pershkrimi"/>
                                        </Form.Group>

                                        <Form.Group controlId="qytetiID">
                                            <Form.Label>Qyteti</Form.Label>
                                            <Form.Control type="text" name="qytetiID" required
                                                placeholder="Qyteti" />
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