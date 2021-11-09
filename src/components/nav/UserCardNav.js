import React from "react";
import Avatar from "react-avatar";
import "../cards/Cards.css";
import "./NavBar.js";
import { Link } from "react-router-dom";

export const UserCardNav = ({ user, size = "small" }) => {
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    // const [state, setstate] = useState(initialState)
    const handleLogout = () => {
        sessionStorage.setItem("active_user", null);
    };

    return currentUser ? (
        <Link className="userCard userCardNav" to={`/user/${user?.id}`}>
            <div className="userCard__avatar">
                <Avatar facebookId="100008343750912" size="40" />
            </div>
            <div className="userCardNav__body">
                <h4 className="userCard__username">{user?.username}</h4>
                <Link className="nav-link" onClick={handleLogout} to="/login">
                    <p className="logout">Log out</p>
                </Link>
            </div>
        </Link>
    ) : null;
};
