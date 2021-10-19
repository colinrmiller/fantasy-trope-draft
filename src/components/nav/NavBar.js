import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
// import "bootstrap/dist/css/bootstrap.min.css"
import { SearchBarComp } from "../utilities/SearchBarComp";

export const NavBar = (props) => {
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    return (
        <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
            <div className="nav__logo">
                <h1 className="nav__logo--logo">Screen</h1>
                <h1 className="nav__logo--logo logo-dark">Draft</h1>
            </div>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <strong>Home</strong>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/friends">
                        <strong>Friends</strong>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={"/user-details/" + currentUser}
                    >
                        <strong>Your Movies</strong>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/messages">
                        <strong>Profile</strong>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/search">
                        <strong>Search</strong>
                    </Link>
                </li>
                {/* <li>SearchBarComp</li> */}
            </ul>
        </nav>
    );
};
