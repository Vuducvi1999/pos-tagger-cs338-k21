import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <NavLink
          exact
          to="/"
          className="navbar-brand"
          activeClassName="font-weight-bold"
        >
          POS tagger
        </NavLink>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                to="/history"
                className="nav-link"
                activeClassName="font-weight-bold text-light border rounded"
              >
                History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-link"
                activeClassName="font-weight-bold text-light border rounded"
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
