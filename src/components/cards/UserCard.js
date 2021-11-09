import React from "react";
import Avatar from "react-avatar";
import "./Cards.css";
import { Link } from "react-router-dom";

export const UserCard = ({ user, size = "small" }) => {
    const fbId = sessionStorage.getItem("FB_Id");
    // const [state, setstate] = useState(initialState)
    switch (size) {
        case "small":
            return (
                <Link className="userCard" to={`/user/${user?.id}`}>
                    <div className="userCard__avatar">
                        <Avatar facebookId="100008343750912" size="40" />
                    </div>
                    <h4 className="userCard__username">{user?.username}</h4>
                </Link>
            );
        case "large":
            return (
                <Link className="userCard" to={`/user/${user?.id}`}>
                    <div className="userCard__avatar">
                        {/* <Avatar name={user.firstName + " " + user.lastName} /> */}
                    </div>
                    <h5 className="userCard__username">{user?.username}</h5>
                    <Avatar facebookId={fbId} />
                </Link>
            );
        default:
            return null;
    }
};
