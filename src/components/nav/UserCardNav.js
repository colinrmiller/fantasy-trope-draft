import React from "react";
import Avatar from "react-avatar";
import "../cards/Cards.css";
import "./NavBar.js";
import { Link } from "react-router-dom";

export const UserCardNav = ({ user, size = "small" }) => {
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    const fbId = sessionStorage.getItem("FB_Id");
    const fbPicture = sessionStorage.getItem("FB_Picture");
    // const [state, setstate] = useState(initialState)
    const handleLogout = () => {
        sessionStorage.setItem("active_user", null);
    };

    return currentUser ? (
        <Link className="userCard userCardNav" to={`/user/${user?.id}`}>
            <div className="userCard__avatar">
                {/* <Avatar
                            size="26"
                            name={user.firstName + " " + user.lastName}
                        /> */}
                {/* <img src={fbPicture} alt="user avatar" /> */}
                <Avatar facebookId="100008343750912" size="40" />
                {/* <Avatar facebookId={fbId} /> */}
                {/* <Avatar
                            googleId="118096717852922241760"
                            size="100"
                            round={true}
                        />
                        <Avatar
                            githubHandle="colinrmiller"
                            size={150}
                            round="20px"
                        />*/}
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
