import { Link, useParams } from "react-router-dom";
import React, { Component } from "react";
import AppNavbar from "./AppNavbar";
import Cart from "./Cart";

export class OrderFood extends Component {
    constructor(props) {
        super(props);
        this.state = { menus: [], addModalShow: false, editModalShow: false, cart: [] }
    }

    //marrja e te dhenave nga API
    refreshList() {
        fetch(process.env.REACT_APP_API + 'menu/' + this.props.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ menus: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }


    render() {
        const { menus, menuID, emertimi, cmimi, pershkrimi } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        return (
            this.props.show ?
            <div>
            <form className="d-flex w-100 mt-4" role="search">
                <input className="form-control me-2 border-3" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="w-75 row row-cols-1 row-cols-md-3 g-3">

                    {menus.map((el, i) => <div className="col">
                        <div className="card h-40" key={i}>
                            <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80" className="card-img-top" alt="Skyscrapers" />
                            <div className="card-body h-30">
                                <h5 className="card-title">{el.emertimi}</h5>
                                <h5 className="card-title">{el.cmimi} €</h5>
                                <p className="card-text">{el.pershkrimi}</p>
                            </div>
                            <button type="button" className="btn btn-secondary btn-block" onClick={() => this.props.handleClick(el)}>Shto ne shporte</button>
                            <button type="button" className="btn btn-info btn-block mt-2">Vlereso Menu-ne</button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
        :<Cart cart={this.props.cart} handleChange={this.props.handleChange} setCart={this.props.setCart}/>
        );
    }
}