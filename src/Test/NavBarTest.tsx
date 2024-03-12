import React, { useState } from "react";

import "./NavBarTest.css";
import { Link, NavLink } from "react-router-dom";

export const NavbarTest = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
        <div className="dropdown">
        <NavLink to="/about">About</NavLink>
          </div>
        </li>
        <li>
        <div className="dropdown">
        <NavLink to="/services">Services</NavLink>
          </div>
        </li>
        <li>
          <div className="dropdown">
            <NavLink to="/contact">Contact</NavLink>
            <div className="dropdown-content">
              <a href="#">Link 123456789</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>

          </div>
        </li>
        <li>
          <div className="dropdown">
            <NavLink to="/contact">Contact</NavLink>
            <div className="dropdown-content">
              <a href="#">Link 123456789</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>

          </div>
        </li>
        <li>
          <div className="dropdown">
            <NavLink to="/contact">Contact</NavLink>
            <div className="dropdown-content">
              <a href="#">Link 123456789</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>

          </div>
        </li>
        <li>
          <div className="dropdown">
            <NavLink to="/contact">Contact</NavLink>
            <div className="dropdown-content">
              <a href="#">Link 123456789</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>

          </div>
        </li>
        <li>
          <div className="dropdown">
            <NavLink to="/contact">Contact</NavLink>
            <div className="dropdown-content">
              <a href="#">Link 123456789</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>

          </div>
        </li>
        <li>
          <div className="dropdown">
            <NavLink to="/contact">about us</NavLink>
            <div className="dropdown-content">
              <a href="#">Link 123456789</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>

          </div>
        </li>
      </ul>
      <ul className={menuOpen==false ? "open" : ""}style={{ height: menuOpen==false ? "6vh" : 0 }}>
      </ul>
    </nav>
  );
};