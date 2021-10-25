import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./UserPage.css";
import { useState, useEffect } from "react";
import { APIManager } from "../../modules/APIManager";

export const AddUser = ({ hidden, userId }) => {
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    const API = new APIManager();
    const [isFollowing, setIsFollowing] = useState(false);

    const getIsFollowing = () => {
        return API.getUserFriend(currentUser, userId).then((res) => {
            if (res.length > 0) {
                setIsFollowing(true);
            } else setIsFollowing(false);
        });
    };

    useEffect(() => {
        getIsFollowing();
    }, []);

    const handleAddUser = () => {
        API.addUserFriend(currentUser, userId).then(getIsFollowing);
    };

    const handleDeleteUser = () => {
        API.deleteUserFriend(currentUser, userId).then(getIsFollowing);
    };

    return (
        <div className={hidden ? "addUser hidden" : "addUser"}>
            {!isFollowing ? (
                <div className="addUser__container" onClick={handleAddUser}>
                    <p className="addUser__text">Follow</p>
                    <AddIcon className="addUser__icon" />
                </div>
            ) : (
                <div className="addUser__container" onClick={handleDeleteUser}>
                    <p className="addUser__text">Following</p>
                    <RemoveIcon className="addUser__icon" />
                </div>
            )}
        </div>
    );
};
