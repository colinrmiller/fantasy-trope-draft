import React from "react";
import { Link } from "react-router-dom";
import { APIManager } from "../../modules/APIManager";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./Cards.css";

const hoverAddFilm = ({ handleMouseOver, handleMouseOut }) => {
    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <span>Hover Me</span>
        </div>
    );
};

export const FilmImg = ({ film, isWinner }) => {
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    const API = new APIManager();
    const [inList, setInList] = useState(false);

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const FilmCardInteraction = () => {
        if (isWinner === true) {
            return (
                <div
                    // onMouseOver={(event) => {
                    //     event.stopPropagation();
                    //     setIsHovering(true);
                    // }}
                    className="filmCard__interaction"
                    // onMouseOver={handleMouseOver}
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
            );
        } else if (isWinner === false) {
            return (
                <div
                    // onMouseOver={(event) => {
                    //     event.stopPropagation();
                    //     setIsHovering(true);
                    // }}
                    className="filmCard__interaction"
                    onMouseOver={handleMouseOver}
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
            );
        }
    };

    useEffect(() => {
        API.getUserFilm(currentUser, film.id).then((res) => {
            if (res?.length > 0) setInList(true);
            else setInList(false);
        });
    }, []);

    return (
        <div
            className="filmCard"
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
        >
            {/* <BrowserRouter basename="/calendar"> */}
            {/* {isHovering ? (
                <img
                    src={
                        "https://image.tmdb.org/t/p/original" + film.poster_path
                    }
                    alt={film?.title}
                    className="filmCard__img img--hover"
                />
            ) : ( */}
            <img
                src={"https://image.tmdb.org/t/p/original" + film.poster_path}
                alt={film?.title}
                className="filmCard__img "
            />
            {/* )} */}
            {/* <img
                src={"https://image.tmdb.org/t/p/original" + film.poster_path}
                alt={film?.title}
                className="filmCard__img"
            /> */}
            {/* {isHovering && <FilmCardInteraction />} */}

            {/* {inList ? (
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
                ></div>
            )} */}
            {/* </BrowserRouter> */}
        </div>
    );
};
