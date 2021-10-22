import React from "react";
import { Link } from "react-router-dom";
import { APIManager } from "../../modules/APIManager";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./Cards.css";

export const FilmCard = ({ film }) => {
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    const API = new APIManager();
    const [inList, setInList] = useState(false);

    useEffect(() => {
        API.getUserFilm(currentUser, film.id).then((res) => {
            if (res?.length > 0) setInList(true);
            else setInList(false);
        });
    }, []);

    return (
        <div className="filmCard">
            <Link to={"/film-details/" + film.id}>
                <img
                    src={
                        "https://image.tmdb.org/t/p/original" + film.poster_path
                    }
                    alt={film?.title}
                    className="filmCard__img"
                />
            </Link>
            {inList ? (
                <div
                    className="filmCard__interaction"
                    onClick={() =>
                        API.deleteFilm(currentUser, film.id).then(() =>
                            setInList(false)
                        )
                    }
                >
                    <div className="filmCard__deleteFilm">
                        <p className="filmCard__deleteFilm--text">Watching</p>
                        <RemoveIcon className="cardIcon--add" />
                    </div>
                </div>
            ) : (
                <div
                    className="filmCard__interaction"
                    onClick={() =>
                        API.addFilm(currentUser, film.id).then((res) => {
                            console.log(res);
                            setInList(true);
                        })
                    }
                >
                    <div className="filmCard__addFilm">
                        <p className="filmCard__addFilm--text">Add Film</p>
                        <AddIcon className="cardIcon--add" />
                    </div>
                </div>
            )}
        </div>
    );
};
