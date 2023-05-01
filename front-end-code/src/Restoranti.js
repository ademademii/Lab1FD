import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddRestorantModal } from './AddRestorantModal';
import { EditRestorantModal } from './EditRestorantModal';
import { Navigation } from './Navigation';


export class Restoranti extends Component {
    constructor(props) {
        super(props);
        this.state = { restorantet: [], addModalShow: false, editModalShow: false }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'restaurant')
            .then(response => response.json())
            .then(data => {
                this.setState({ restorantet: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    //delete a restaurant
    deleteRestorant(id) {
        if (window.confirm('A doni ta fshini restorantin?')) {
            fetch(process.env.REACT_APP_API + 'restaurant/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { restorantet, restaurantID, emri, data_regjistrimit, nrYjeve, foto, pershkrimi } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div className="restaurant mt-5">
                <Navigation/>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Emri</th>
                            <th>Data Regjistrimit</th>
                            <th>Nr yjeve</th>
                            <th>Foto</th>
                            <th>Pershkrimi</th>
                            <th>Qyteti</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restorantet.map(el =>
                            <tr key={el.restaurantID}>
                                <td>{el.emri}</td>
                                <td>{el.data_regjistrimit}</td>
                                <td>{el.nrYjeve}</td>
                                <td>{el.foto}</td>
                                <td>{el.pershkrimi}</td>
                                <td>{el.qyteti.emri}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                restaurantID: el.restaurantID, emri: el.emri, data_regjistrimit: el.data_regjistrimit, nrYjeve: el.nrYjeve, foto: el.foto, pershkrimi: el.pershkrimi
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteRestorant(el.restaurantID)}>
                                            Delete
                                        </Button>

                                        <EditRestorantModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            restaurantID={restaurantID}
                                            emri={emri}
                                            data_regjistrimit={data_regjistrimit}
                                            nrYjeve={nrYjeve}
                                            foto={foto} 
                                            pershkrimi={pershkrimi} />
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <div className="d-grid gap-2">
                        <Button variant='primary' size='lg'
                            onClick={() => { this.setState({ addModalShow: true }) }}>
                            Shto Restorantin
                        </Button>
                    </div>
                    <AddRestorantModal show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}