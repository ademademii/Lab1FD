import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Navigation } from '../Navigation';


export class Mesazhet extends Component {
    constructor(props) {
        super(props);
        this.state = { mesazhet: [], addModalShow: false, editModalShow: false }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'contact')
            .then(response => response.json())
            .then(data => {
                this.setState({ mesazhet: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteMesazhin(id) {
        if (window.confirm('A doni ta fshini mesazhin?')) {
            fetch(process.env.REACT_APP_API + 'contact/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { mesazhet, id, emri, mbiemri, subjekti, mesazhi } = this.state;
        return (
            <div className="contact mt-5">
                <Navigation />
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Emri</th>
                            <th>Mbiemri</th>
                            <th>Subjekti</th>
                            <th>Mesazhi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mesazhet.map(el =>
                            <tr key={el.id}>
                                <td>{el.id}</td>
                                <td>{el.emri}</td>
                                <td>{el.mbiemri}</td>
                                <td>{el.subjekti}</td>
                                <td>{el.mesazhi}</td>
                                <td>
                                    <ButtonToolbar>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteMesazhin(el.id)}>
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