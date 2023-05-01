import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Navigation } from '../Navigation';
import { AddRoleModal } from '../AddRoleModal';


export class Roli extends Component {
    constructor(props) {
        super(props);
        this.state = { roles: [], addModalShow: false, editModalShow: false }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'setup')
            .then(response => response.json())
            .then(data => {
                this.setState({ roles: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteRolin(id) {
        if (window.confirm('A doni ta fshini kete rol?')) {
            fetch(process.env.REACT_APP_API + 'setup/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { roles, id, name } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div className="ushqimi mt-5">
                <Navigation />
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Emri i rolit</th>
                            <th>Pershkrimi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map(el =>
                            <tr key={el.id}>
                                <td>{el.id}</td>
                                <td>{el.name}</td>
                                <td>abc</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-3" variant="info">
                                            Edit
                                        </Button>

                                        <Button className="ml-2" variant="danger"
                                            onClick={() => this.deleteRolin(el.id)}>
                                            Delete
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <div className="d-grid gap-2">
                        <Button variant='primary' size='lg'
                            onClick={() => { this.setState({ addModalShow: true }) }}>
                            Shto Rolin
                        </Button>
                    </div>
                    <AddRoleModal show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}