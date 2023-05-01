import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Navigation } from '../Navigation';
import { AddTelefoniModal } from './AddTelefoniModal';
import { EditTelefoniModal } from './EditTelefoniModal';


export class Telefoni extends Component {
    constructor(props) {
        super(props);
        this.state = { numbers: [], addModalShow: false }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'telefoni')
            .then(response => response.json())
            .then(data => {
                this.setState({ numbers: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    //delete a user
    deletePhoneNumber(id) {
        if (window.confirm('A doni ta fshini numrin e telefonit?')) {
            fetch(process.env.REACT_APP_API + 'telefoni/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { numbers, nr_tel ,numri, userId } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div className="role mt-5">
                <Navigation />
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Nr i telefonit</th>
                            <th>Id e perdoruesit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {numbers.map(el =>
                            <tr key={el.numri}>
                                <td>{el.nr_tel}</td>
                                <td>{el.userId}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                numri: el.numri, nr_tel: el.nr_tel, userId:el.userId
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deletePhoneNumber(el.numri)}>
                                            Delete
                                        </Button>


                                        <EditTelefoniModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            numri={numri}
                                            userId={userId}
                                            nr_tel={nr_tel}
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
                            Shto Numrin e telefonit
                        </Button>
                    </div>
                    <AddTelefoniModal show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}