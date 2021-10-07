import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../store/AuthStore'

const Navbar = () => {
  const { login, isLogged, logout } = useContext(AuthContext)
  return (
  <nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
    </a>

    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <Link to="/" className="navbar-item">
        Home
      </Link>

      <Link to="/article" className="navbar-item">
        Products
      </Link>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          {!isLogged && <Link to="/" className="button is-primary">
            <strong>Login</strong>
          </Link>}
          {!isLogged && <Link to="/register" className="button is-secondary">
            <strong>Register</strong>
          </Link>}
          {isLogged && <a onClick={logout} className="button is-primary">
            <strong>Logout</strong>
          </a>}
        </div>
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar
