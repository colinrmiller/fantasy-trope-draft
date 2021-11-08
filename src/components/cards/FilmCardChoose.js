import React from "react";
import "./Cards.css";

export const FilmCardChoose = ({ film, handleGetNewFilm, handleChoice }) => {
    return (
        <div className="filmCardLarge">
            {/* <Link to={"/film-details/" + film.id}> */}
            <img
                id="filmCardChoose__img"
                src={"https://image.tmdb.org/t/p/original" + film.poster_path}
                alt={film?.title}
                className="filmCardLarge__img"
                onClick={() => handleChoice()}
            />
            {/* </Link> */}
            <div
                className="filmCardCompare__interaction"
                onClick={() => handleGetNewFilm()}
            >
                <div className="filmCardCompare__newFilm">
                    <p className="filmCardCompare__interaction--text">
                        New Pick
                    </p>
                    {/* <RemoveIcon className="cardIcon" /> */}
                </div>
            </div>
        </div>
    );
};
