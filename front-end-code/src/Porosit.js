import { useState } from "react"
import AppNavbar from "./AppNavbar"
import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

const Porosit = () => {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  console.log(date)

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(process.env.REACT_APP_API + 'porosia', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        DataPorosise: date,
        CmimiTotal: localStorage.getItem('cartPrice'),
        Adresa: event.target.adresa.value,
        FormaPageses: event.target.pagesa.value,
        UserId: localStorage.getItem('id')
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

  return (
    <div className="Porosit">
      <h3 className="mt-5">Detajet e Porosise</h3>
      <div className="mt-5 w-50 mx-auto">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <div class="row g-3">

              <div class="col">
                <input type="text" class="form-control" placeholder="EMRI" aria-label="Emri" />
              </div>

              <div class="col">
                <input type="text" class="form-control" placeholder="MBIEMRI" aria-label="Mbiemri" />
              </div>
            </div>

            <div class="mb-3 mt-3">
              <label for="adresa" class="form-label">
                Adresa
              </label>
              <input type="text" name="adresa" class="form-control" id="adresa" placeholder="Adresa" />
            </div>

          </div>
          <Form.Group controlId="pagesa">
            <Form.Label>Menyra e Pageses</Form.Label>
            <Form.Control as="select" name="pagesa" required>
              <option value="kesh">Me para ne dore</option>
              <option value="Visa">Visa</option>
              <option value="paypal">Paypal</option>
            </Form.Control>
          </Form.Group>
          <h5 className="mt-4">
            <span>Totali: </span>
            <b><span>{localStorage.getItem('cartPrice')} €</span></b>
          </h5>
          <button type="submit" class="btn btn-primary">
            Paguaj
          </button>

        </form>
      </div>
    </div>
  )
}

export default Porosit
