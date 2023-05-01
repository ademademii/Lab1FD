import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
//import { AddQytetinModal } from './AddQytetinModal';
//import { EditQytetinModal } from './EditQytetinModal';
import { Navigation } from './Navigation';


export class Restaurant_Qyteti extends Component {
    constructor(props) {
        super(props);
        this.state = { lidhjet: [], addModalShow: false }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'restaurant_qyteti')
            .then(response => response.json())
            .then(data => {
                this.setState({ lidhjet: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteLidhja(id1, id2) {
        if (window.confirm('A doni ta fshini kete lokacion?')) {
            fetch((process.env.REACT_APP_API + 'restaurant_qyteti/' + id1) + (process.env.REACT_APP_API + 'restaurant_qyteti/' + id2), {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { lidhjet, restaurantID, qytetiID } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div className="mt-5">
                <Navigation />
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Restauranti</th>
                            <th>Qyteti</th>
                        </tr>
                    </thead>
                    <tbody>

                            <tr >
                                <td>1</td>
                                <td>2</td>
                                <td>
                                    <ButtonToolbar>
                                    <Button className="mr-2" variant="info">
                                        Edit
                                    </Button>
                                        <Button className="mr-2" variant="danger">
                                            Delete
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                        </tr>
                        <tr >
                            <td>3</td>
                            <td>1</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info">
                                        Edit
                                    </Button>

                                    <Button className="mr-2" variant="danger">
                                        Delete
                                    </Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                        <tr >
                            <td>5</td>
                            <td>2</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info">
                                        Edit
                                    </Button>
                                    <Button className="mr-2" variant="danger">
                                        Delete
                                    </Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    </tbody>

                </Table>

            </div>
        )
    }
}