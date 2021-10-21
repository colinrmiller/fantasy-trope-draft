import React from "react";
import Avatar from "react-avatar";
import "./UserCard.css";

export const UserCard = ({ user, size = "small" }) => {
    const fbId = sessionStorage.getItem("fb_id");
    switch (size) {
        case "small":
            return (
                <div className="userCard">
                    <div className="user">
                        {/* <Avatar
                            size="26"
                            name={user.firstName + " " + user.lastName}
                        />
                        <Avatar facebookId={fbId} />
                        <Avatar
                            googleId="118096717852922241760"
                            size="100"
                            round={true}
                        />
                        <Avatar facebookId="100008343750912" size="150" /> */}
                        <Avatar
                            githubHandle="colinrmiller"
                            size={150}
                            round="20px"
                        />
                    </div>
                    <h4 className="userCard__username">{user.username}</h4>
                </div>
            );
        case "large":
            return (
                <div className="userCard">
                    <div className="user">
                        {/* <Avatar name={user.firstName + " " + user.lastName} /> */}
                    </div>
                    <h5 className="userCard__username">{user.username}</h5>
                    <Avatar facebookId={fbId} />
                </div>
            );
        default:
            return null;
    }
};
