import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddUshqimiModal } from './AddUshqimiModal';
import { EditUshqimiModal } from './EditUshqimiModal';
import { Navigation } from './Navigation';


export class Ushqimi extends Component {
    constructor(props) {
        super(props);
        this.state = { ushqimet: [], addModalShow: false, editModalShow: false }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'ushqimi')
            .then(response => response.json())
            .then(data => {
                this.setState({ ushqimet: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    //delete a restaurant
    deleteUshqimi(id) {
        if (window.confirm('A doni ta fshini ushqimin?')) {
            fetch(process.env.REACT_APP_API + 'ushqimi/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { ushqimet, ushqimiID, emri, sasiaDisponueshme } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div className="ushqimi mt-5">
                <Navigation />
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Emri</th>
                            <th>Sasia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ushqimet.map(el =>
                            <tr key={el.ushqimiID}>
                                <td>{el.ushqimiID}</td>
                                <td>{el.emri}</td>
                                <td>{el.sasiaDisponueshme}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                ushiqmiID: el.ushqimiID, emri: el.emri, sasiaDisponueshme: el.sasiaDisponueshme
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteUshqimi(el.ushqimiID)}>
                                            Delete
                                        </Button>

                                        <EditUshqimiModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            ushqimiID={ushqimiID}
                                            emri={emri}
                                            sasiaDisponueshme={sasiaDisponueshme}
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
                            Shto Ushqimin
                        </Button>
                    </div>
                    <AddUshqimiModal show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}