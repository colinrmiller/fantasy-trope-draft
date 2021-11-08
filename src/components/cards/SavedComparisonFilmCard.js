import React from "react";
import "./Cards.css";
import { useState } from "react";

export const SavedComparisonFilmCard = ({
    film,
    handleChoice,
    isWinner,
    score,
}) => {
    const [hover, setHover] = useState(false);

    return (
        <>
            {isWinner ? (
                <div
                    className="filmCardLarge filmCardLarge--winner"
                    // onMouseEnter={() => setHover(true)}
                    // onMouseLeave={() => setHover(false)}
                >
                    {/* <Link to={"/film-details/" + film.id}> */}
                    <img
                        className={
                            hover
                                ? "filmCardLarge__img filmCardLarge__img--hover"
                                : "filmCardLarge__img"
                        }
                        src={
                            "https://image.tmdb.org/t/p/original" +
                            film.poster_path
                        }
                        alt={film?.title}
                        onClick={() => handleChoice()}
                    />
                    {/* </Link> */}
                </div>
            ) : (
                <div
                    className="filmCardLarge"
                    // onMouseEnter={() => setHover(true)}
                    // onMouseLeave={() => setHover(false)}
                >
                    {/* <Link to={"/film-details/" + film.id}> */}
                    <img
                        className={
                            hover
                                ? "filmCardLarge__img filmCardLarge__img--hover"
                                : "filmCardLarge__img"
                        }
                        src={
                            "https://image.tmdb.org/t/p/original" +
                            film.poster_path
                        }
                        alt={film?.title}
                        onClick={() => handleChoice()}
                    />
                    {/* </Link> */}
                </div>
            )}
            <div className="filmCardLarge__score">
                {isWinner ? (
                    <p className="filmCardLarge__score filmCardLarge__score--winner">
                        {score}%
                    </p>
                ) : (
                    <p className="filmCardLarge__score">{score}%</p>
                )}
                {/* <RemoveIcon className="cardIcon" /> */}
            </div>
        </>
    );
};
