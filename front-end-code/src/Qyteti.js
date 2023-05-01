import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddQytetinModal } from './AddQytetinModal';
import { EditQytetinModal } from './EditQytetinModal';
import { Navigation } from './Navigation';


export class Qyteti extends Component {
    constructor(props) {
        super(props);
        this.state = { qytetet: [], addModalShow: false }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'qyteti')
            .then(response => response.json())
            .then(data => {
                this.setState({ qytetet: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteQytetin(id) {
        if (window.confirm('A doni ta fshini qytetin?')) {
            fetch(process.env.REACT_APP_API + 'qyteti/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { qytetet, qytetiID, emri } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div className="mt-5">
                <Navigation/>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Emri</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qytetet.map(el =>
                            <tr key={el.qytetiID}>
                                <td>{el.qytetiID}</td>
                                <td>{el.emri}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                qytetiID: el.qytetiID, emri: el.emri
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteQytetin(el.qytetiID)}>
                                            Delete
                                        </Button>

                                        <EditQytetinModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            qytetiID={qytetiID}
                                            emri={emri} />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <div className="d-grid gap-2">
                        <Button variant='primary' size='lg'
                            onClick={() => { this.setState({ addModalShow: true }) }}>
                            Shto Qytetin
                        </Button>
                    </div>
                    <AddQytetinModal show={this.state.addModalShow}
                        onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}