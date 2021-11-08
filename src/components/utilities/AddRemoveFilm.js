import React from "react";
import { Link } from "react-router-dom";
import { APIManager } from "../../modules/APIManager";
import { useState, useEffect } from "react";
import "../cards/Cards.css";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

export const AddRemoveFilm = ({ film }) => {
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    const API = new APIManager();
    const [inList, setInList] = useState(false);

    useEffect(() => {
        API.getUserFilm(currentUser, film.id).then((res) => {
            if (res?.length > 0) setInList(true);
            else setInList(false);
        });
    }, [film]);

    return (
        <>
            {inList ? (
                <div
                    className="filmCardDetails__interaction"
                    onClick={() =>
                        API.deleteFilm(currentUser, film.id).then(() =>
                            setInList(false)
                        )
                    }
                >
                    <div className="filmCard__deleteFilm">
                        <BookmarkRemoveIcon className="cardIcon cardIcon--remove" />
                    </div>
                </div>
            ) : (
                <div
                    className="filmCardDetails__interaction"
                    onClick={() =>
                        API.addFilm(currentUser, film.id).then((res) => {
                            console.log(res);
                            setInList(true);
                        })
                    }
                >
                    <div className="filmCard__addFilm">
                        <BookmarkIcon className="cardIcon" />
                    </div>
                </div>
            )}
        </>

        // </div>
    );
};
