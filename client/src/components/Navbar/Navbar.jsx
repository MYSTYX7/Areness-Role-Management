// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </div>
      <div className="right-links">
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
