import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // Import the new CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/create-quiz" className="nav-link">Create Quiz</Link>
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/register" className="nav-link">Register</Link>
    </nav>
  );
};

export default Navbar;
