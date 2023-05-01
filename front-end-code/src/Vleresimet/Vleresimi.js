import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Navigation } from '../Navigation';
import { AddVleresimiModal } from './AddVleresimiModal';
import { EditVleresimiModal } from './EditVleresimiModal';


export class Vleresimi extends Component {
    constructor(props) {
        super(props);
        this.state = { vleresimet: [], addModalShow: false }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'vleresimet')
            .then(response => response.json())
            .then(data => {
                this.setState({ vleresimet: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    //delete a user
    deleteVleresimi(id) {
        if (window.confirm('A doni ta fshini vleresimin?')) {
            fetch(process.env.REACT_APP_API + 'vleresimet/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { vleresimet, vleresimiID, vleresimi, menuID } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div className="role mt-5">
                <Navigation />
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Vleresimi</th>
                            <th>Menu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vleresimet.map(el =>
                            <tr key={el.vleresimiID}>
                                <td>{el.vleresimi}</td>
                                <td>{el.menuID}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                vleresimiID: el.vleresimiID, vleresimi: el.vleresimi, menuID: el.menuID
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteVleresimi(el.vleresimiID)}>
                                            Delete
                                        </Button>


                                        <EditVleresimiModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            vleresimiID={vleresimiID}
                                            vleresimi={vleresimi}
                                            menuID={menuID}
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
                            Shto Vleresimin
                        </Button>
                    </div>
                    <AddVleresimiModal show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}