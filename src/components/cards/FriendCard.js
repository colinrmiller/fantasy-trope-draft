import React from "react";
import { useState, useEffect } from "react";
import { APIManager } from "../../modules/APIManager";

export const FriendCard = ({ userId }) => {
    const API = new APIManager();
    const [user, setUser] = useState(null);

    const getUser = () => {
        API.getUser(userId).then((res) => {
            setUser(res);
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    return <div className="friendCard"></div>;
};
