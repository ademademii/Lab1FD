import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Navigation } from './Navigation';
import { AddRestorantModal } from './AddRestorantModal';
import { OrderFood } from "./OrderFood";
import restaurant from './Photos/restaurant.png';
import './Footer.js'
import Footer from "./Footer.js";


export class ShfletoRestaurantet extends Component {
    constructor(props) {
        super(props);
        this.state = { restorantet: [], addModalShow: false, editModalShow: false, restaurantID: "" }
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

    handleClick(id) {

        fetch(process.env.REACT_APP_API + 'restfavorite', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem("id"),
                restId: id
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                })
    }

    render() {
        const { restorantet, restaurantID, emri, data_regjistrimit, nrYjeve, foto, pershkrimi } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        return (
            <>
                <form className="d-flex w-100 mt-4" role="search">
                    <input className="form-control me-2 border-3" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>

                <div className="row row-cols-1 row-cols-md-2 g-3">
                    <div className="w-75 row row-cols-1 row-cols-md-3 g-3">

                        {restorantet.map(el => <div className="col">
                            <div className="card h-50" key={el.restaurantID}>
                                <img src={restaurant} className="card-img-top" alt="Skyscrapers" />
                                <div className="card-body h-30">
                                    <h5 className="card-title">{el.emri}</h5>
                                    <small>{el.nrYjeve} yje</small>
                                    <p>Gjendemi ne qytetin: {el.qyteti.emri}</p>
                                    <p className="card-text">{el.pershkrimi}</p>
                                </div>

                                <Link to={`/order`} class="btn btn-secondary btn-block" onClick={() => { this.props.setId(el.restaurantID) }}>
                                    Zgjedh  
                                </Link>
                                <button type="button" value="LOGIN" class="btn btn-secondary btn-block mt-2" onClick={()=>{this.handleClick(el.restaurantID)}}>
                                    <i class="fa-solid fa-heart"></i>
                                </button>
                                <div className="card-footer">
                                    <small className="text-muted">{el.data_regjistrimit}</small>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div></>
        );
    }
}