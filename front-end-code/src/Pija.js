import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddPijaModal } from './AddPijaModal';
import { EditPijaModal } from './EditPijaModal';
import { Navigation } from './Navigation';


export class Pija extends Component {
    constructor(props) {
        super(props);
        this.state = { pijet: [], addModalShow: false, editModalShow: false }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'pija')
            .then(response => response.json())
            .then(data => {
                this.setState({ pijet: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    //delete a restaurant
    deletePija(id) {
        if (window.confirm('A doni ta fshini pijen?')) {
            fetch(process.env.REACT_APP_API + 'pija/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { pijet, pijaID, emri, sasiaPijeve } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div className="pija mt-5">
                <Navigation />
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Emri</th>
                            <th>Sasia</th>
                            <th>Pershkrimi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pijet.map(el =>
                            <tr key={el.pijaID}>
                                <td>{el.pijaID}</td>
                                <td>{el.emri}</td>
                                <td>pershkrimi</td>
                                <td>{el.sasiaPijeve}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                pijaID: el.pijaID, emri: el.emri, sasiaPijeve: el.sasiaPijeve
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deletePija(el.pijaID)}>
                                            Delete
                                        </Button>

                                        <EditPijaModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            pijaID={pijaID}
                                            emri={emri}
                                            sasiaPijeve={sasiaPijeve}
                                        />
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <div className="d-grid gap-2">
                        <Button variant='primary' size='lg'
                            onClick={() => { this.setState({ addModalShow: true }) }}>
                            Shto Pije
                        </Button>
                    </div>
                    <AddPijaModal show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}