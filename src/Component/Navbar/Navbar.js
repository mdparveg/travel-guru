import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Resource/Logo.png'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className="main">
             <div className="d-flex py-4 px-5 header nav">
            <div className="logo d-flex align-items-center"> 
            <a className="navbar-brand" href="#"><img src={logo} height="60px" alt=""/></a>
                
            </div>
            <form action="" className="form-inline my-2 my-lg-0">
        <input type="search" className="form-control mr-sm-2"  placeholder="Search your Destination." aria-label="Search"/>
      <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
    </form>
            <nav className="ml-auto d-flex align-items-center ">
              <Link to="/home">Home</Link>
                <a href="#destination">Destination</a>
                <a href="#blog">Blog</a>
                <a href="#contact">Contact</a>
              <Link to="/login"><button className="btn btn-warning">Login</button></Link>
                
            </nav>
        </div>
        </div>
    );
};

export default Navbar;