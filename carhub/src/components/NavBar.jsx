import React from "react";
import { Link } from "react-router-dom"; 
// import "./NavBar.css"; 

const NavBar = () => {

    return (
        <div className="navbar-container">
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/new-post">
                <button>Create Post</button>
            </Link>
            <Link to="/posts">
                <button>View Posts</button>
            </Link>

            
        </div>
    );

}

export default NavBar;