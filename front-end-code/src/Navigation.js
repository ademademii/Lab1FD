import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Navigation extends Component {


    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Link to="/restaurant" className="d-inline p-2 bg-dark text-white">Restorantet</Link>
                        <Link to="/restaurant_qyteti" className="d-inline p-2 bg-dark text-white">Menaxhimi i qyteteve</Link>
                        <Link to="/qyteti" className="d-inline p-2 bg-dark text-white">Qytetet</Link>
                        <Link to="/menu" className="d-inline p-2 bg-dark text-white">Menu</Link>
                        <Link to="/roles" className="d-inline p-2 bg-dark text-white">Roli</Link>
                        <Link to="/users" className="d-inline p-2 bg-dark text-white">Perdoruesit</Link>
                        <Link to="/userrole" className="d-inline p-2 bg-dark text-white">Menaxhimi i rolit</Link>
                        <Link to="/pija" className="d-inline p-2 bg-dark text-white">Pijet</Link>
                        <Link to="/ushqimi" className="d-inline p-2 bg-dark text-white">Ushqimet</Link>
                        <Link to="/pagesaDashboard" className="d-inline p-2 bg-dark text-white">Pagesa</Link>
                        <Link to="/lagje" className="d-inline p-2 bg-dark text-white">Lagjet</Link>
                        <Link to="/" className="d-inline p-2 bg-dark text-white">Porosite</Link>
                        <Link to="/mesazhet" className="d-inline p-2 bg-dark text-white">Kontaktet</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}