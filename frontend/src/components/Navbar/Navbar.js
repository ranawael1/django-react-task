import { useState, useEffect } from "react"
import { Redirect, useHistory } from 'react-router-dom'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"

export default function Navbar(props) {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link className="navbar-brand" to="/">{props.username}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart 5
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0 pb-0">
            <li className="nav-item active">
              <Link to="/login" onClick={() => { window.localStorage.clear() }} className="nav-link text-link text-center text-decoration-none">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}