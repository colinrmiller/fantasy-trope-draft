import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { SearchBarComp } from "../utilities/SearchBarComp";
import { useContext } from "react";
// import { AuthContext } from "../FTD";
import { TimeUntil } from "../utilities/TimeUntil";
import { UserCardNav } from "./UserCardNav";
import { useState, useEffect } from "react";
import { APIManager } from "../../modules/APIManager";

export const NavBar = (props) => {
    // const { state, dispatch } = useContext(AuthContext);
    // const { avatar_url, name, public_repos, followers, following } = state.user;

    const API = new APIManager();

    const [user, setUser] = useState(null);
    const currentUser = parseInt(sessionStorage.getItem("active_user"));

    useEffect(() => {
        API.getUser(currentUser).then((res) => {
            setUser(res);
        });
    }, [currentUser]);

    return (
        <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
            <div className="nav__logo">
                <Link className="nav__logo" to="/">
                    <h1 className="nav__logo--logo">Screen</h1>
                    <h1 className="nav__logo--logo logo-dark">Draft</h1>
                </Link>
            </div>
            <ul className="nav nav-pills nav-fill">
                {/* <li className="nav-item">
                    <TimeUntil /> */}
                {/* </li> */}
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <strong>Home</strong>
                    </Link>
                </li> */}
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/friends">
                        <strong>Friends</strong>
                    </Link>
                </li> */}
                <li className="nav-item">
                    <Link className="nav-link" to={"/user/" + currentUser}>
                        <strong>Your Movies</strong>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/search">
                        <strong>Search</strong>
                    </Link>
                </li>
                <li className="nav-item">
                    <div className="nav__avatar">
                        <UserCardNav user={user} />
                    </div>
                </li>
                {/* {/* <li>SearchBarComp</li> */}
            </ul>
        </nav>
    );
};
