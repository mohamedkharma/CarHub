import React from "react";
import { Link } from "react-router-dom"; 
import "./NavBar.css"; 

const NavBar = () => {

    return (
        <div className="navbar-container">
            <div className="website-name">CarHub</div>
            <div className="navbar-buttons">
                <Link to="/" className="navbar-button">
                    Home
                </Link>
                <Link to="/new-post" className="navbar-button">
                    Create Post
                </Link>
                <Link to="/posts" className="navbar-button">
                    View Posts
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
