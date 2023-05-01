import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Navigation } from '../Navigation';

export class Pagesa2 extends Component {
/*        super(props);
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
    }*/

    render() {
        /*const { restorantet, restaurantID, emri, data_regjistrimit, nrYjeve, foto, pershkrimi } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });*/
        return (
            <div className="restaurant mt-5">
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Nr i artikujve</th>
                            <th>Totali i fatures</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2</td>
                            <td>12 €</td>
                                <td>
                                    <ButtonToolbar>

                                        <Button className="mr-2" variant="danger">
                                            Delete
                                        </Button>
                                    </ButtonToolbar>

                                </td>

                        </tr>

                        <tr>
                            <td>1</td>
                            <td>5 €</td>
                                <td>
                                    <ButtonToolbar>

                                        <Button className="mr-2" variant="danger">
                                            Delete
                                        </Button>
                                    </ButtonToolbar>

                                </td>

                        </tr>
                        <tr>
                            <td>5</td>
                            <td>25.23 €</td>
                                <td>
                                    <ButtonToolbar>

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