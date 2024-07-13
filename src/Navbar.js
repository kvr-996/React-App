import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, logout }) => {
  const handleLogout = () => {
    alert('You have been logged out!');
    logout();
  };

  return ( 
    <nav className="navbar">
      <Link to='/' style={{ textDecoration: 'none',color:'white' }}>
        <h1 className="logo">Fan-Fiction Platform</h1>
      </Link>
      <div className="nav-links" style={{fontSize:"18px"}}>
        <Link to="/" className="nav-link">Home</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
        
        {!isLoggedIn && (
          <Link to="/userreg" className="nav-link">User Registration</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
