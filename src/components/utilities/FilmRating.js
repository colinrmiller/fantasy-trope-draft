import React from "react";
import "./misc.css";

export const FilmRating = ({ rating, numberOfRatings }) => {
    const ratingTop = Math.round(rating * 10) / 10 + ".0";
    return rating ? (
        <div className="filmRating">
            <div className="filmRating--top">{ratingTop.slice(0, 3)}</div>
            <div className="filmRating--slash"></div>
            <div className="filmRating--bottom">5.0</div>
            <div className="filmRating--ratings">{numberOfRatings} votes</div>
        </div>
    ) : null;
};
