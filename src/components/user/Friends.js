import React from "react";
import { useState, useEffect } from "react";
import { APIManager } from "../../modules/APIManager";
import { FriendCard } from "../cards/FriendCard";
import "./Friends.css";

export const Friends = () => {
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    const API = new APIManager();

    const [friends, setFriends] = useState([]);

    const getFriends = () => {
        return API.getFriends().then((res) => {
            setFriends(res);
        });
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <div className="friends">
            {/* {friends.map((friend) => {
                <FriendCard userId={friend} />;
            })} */}
        </div>
    );
};
