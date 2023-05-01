import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';


export class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = { favorites: [], addModalShow: false, editModalShow: false }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'restfavorite/' + localStorage.getItem("id"))
            .then(response => response.json())
            .then(data => {
                this.setState({ favorites: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    //delete a restaurant
    deleteF(id) {
        if (window.confirm('A doni ta largoni restaurantin nga lista favorite?')) {
            fetch(process.env.REACT_APP_API + 'restfavorite/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { favorites, restauranti,userId, favID, restId } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div className="restaurant mt-5">
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Emri i restaurantit</th>
                            <th>Numri i yjeve</th>
                            <th>Pershkrimi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorites.map(el =>
                            <tr key={el.favID}>
                                <td>{el.restauranti.emri}</td>
                                <td>{el.restauranti.nrYjeve}</td>
                                <td>{el.restauranti.pershkrimi}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteF(el.favID)}>
                                            Delete
                                        </Button>
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>
            </div>
        )
    }
}