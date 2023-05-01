import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

const RestorantetFavorite = () => {
  return (
    <div>
      <ul className="nav nav-pills mt-3">
        <li className="nav-item bg-primary">
          <Link
            className="nav-link text-white"
            aria-current="page"
            to="/restorantetfavorite"
          >
            Restorantet Favorite
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Te dhenat e mia
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Porositë e mia
          </a>
        </li>
      </ul>
      <div className="d-flex container mt-3">
        <div className="card ms-2" style={{ width: 18 + 'rem' }}>
          <img
            src="https://media-cdn.tripadvisor.com/media/photo-s/1a/b8/46/6d/london-stock.jpg"
            class="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Restoranti1</h5>
            <p className="card-text">Restoranti1</p>
            <Link className="btn btn-primary btn-block">
              Shko te Restoranti
            </Link>
            <Link className="btn btn-danger btn-block mt-2">
              Largo Restorantin
            </Link>
          </div>
        </div>
        <div className="card ms-2" style={{ width: 18 + 'rem' }}>
          <img
            src="https://media.architecturaldigest.com/photos/590cc6c3b3064307ffee59a4/master/w_3000,h_2000,c_limit/Tallest%20Restaurants%20in%20the%20World%207.jpg"
            class="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Restoranti2</h5>
            <p className="card-text">Restoranti2</p>
            <Link className="btn btn-primary btn-block">
              Shko te Restoranti
            </Link>
            <Link className="btn btn-danger btn-block mt-2">
              Largo Restorantin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestorantetFavorite
