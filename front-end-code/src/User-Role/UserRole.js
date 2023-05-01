import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
//import { AddUshqimiModal } from './AddUshqimiModal';
//import { EditUshqimiModal } from './EditUshqimiModal';
import { Navigation } from '../Navigation';


export class UserRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            roles:[],
            addModalShow: false,
            editModalShow: false
        }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'setup/getallusers')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
                console.log(data)
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    ktheRolin(email) {
        fetch(process.env.REACT_APP_API + 'setup/getUserRoles/' + email, {
            method: 'GET',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ roles: data });
            });
    }

    render() {
        const { users, id, userName, email } = this.state;
        const { roles } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div className="ushqimi mt-5">
                <Navigation />
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Roli</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(el =>
                            <tr key={el.id}>
                                <td>{el.userName}</td>
                                <td>
                                    {this.state.roles}
                                    <Button className="ml-2" variant="danger" 
                                        onClick={() => this.ktheRolin(el.email)}>
                                        Delete
                                    </Button>
                                </td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-3" variant="info">
                                            Edit
                                        </Button>
                                        {
                                        /*
                                        <Button className="ml-2" variant="danger"
                                            onClick={() => this.deleteRolin(el.id)}>
                                            Delete
                                        </Button>
                                        
                                        <EditUshqimiModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            ushqimiID={ushqimiID}
                                            emri={emri}
                                            sasiaDisponueshme={sasiaDisponueshme}
                                        />*/}
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    {/* <div className="d-grid gap-2">
                        <Button variant='primary' size='lg'
                            onClick={() => { this.setState({ addModalShow: true }) }}>
                            Shto Ushqimin
                        </Button>
                    </div>
                    <AddUshqimiModal show={this.state.addModalShow}
                        onHide={addModalClose}
                    />*/}
                </ButtonToolbar>
            </div>
        )
    }
}