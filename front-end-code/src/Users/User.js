import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
//import { AddUshqimiModal } from './AddUshqimiModal';
//import { EditUshqimiModal } from './EditUshqimiModal';
import { Navigation } from '../Navigation';


export class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            roles: [],
            addModalShow: false,
            editModalShow: false
        }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'setup/users')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }


    deleteUser(id) {
        if (window.confirm('A doni ta fshini kete perdorues?')) {
            fetch(process.env.REACT_APP_API + 'setup/deleteUser/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    ktheRolin(email) {
        fetch(process.env.REACT_APP_API + 'setup/getUserRoles/' + email)
            .then(response => response.json())
            .then(data => {
                this.setState({ roles: data });
            });
    }

    render() {
        const { users, id, userName, email, phoneNumber, twoFactorEnabled } = this.state;
        const { roles, name } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        let number, twofactor;
        if (!twoFactorEnabled) {
            twofactor = 'false';
        }
        else { twofactor = 'true'; }
        if (phoneNumber == null) {
            number = 'nuk ka numer telefoni';
        } 
            
        return (
            <div className="ushqimi mt-5">
                <Navigation />
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Two factor enabled</th>
                            <th>Roli</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(el =>
                            <tr key={el.id}>
                                <td>{el.id}</td>
                                <td>{el.userName}</td>
                                <td>{el.email}</td>
                                <td>{number}</td>
                                <td>{twofactor}</td>
                                <td>

                                </td>
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
                                                onClick={() => this.deleteUser(el.id)}>
                                            Delete
                                        </Button>
                                        {/*
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