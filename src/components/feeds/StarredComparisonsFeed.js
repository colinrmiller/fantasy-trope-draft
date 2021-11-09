import React from "react";
import { APIManager } from "../../modules/APIManager";
import { filterStarredComparisons } from "../utilities/filterStarredComparisons";
import { useState, useEffect } from "react";
import { FilmComparisonCard } from "../cards/FilmComparisonCard";
import "./feeds.css";

export const StarredComparisonsFeed = () => {
    const API = new APIManager();
    const [starredComparisons, setStarredComparisons] = useState([]);
    const fetchLimit = 20;

    const getstarredComparisons = () => {
        API.getStarredFilmComparisons().then((res) => {
            setStarredComparisons(filterStarredComparisons(res));
        });
    };

    useEffect(getstarredComparisons, []);

    return (
        <div className="StarredComparisonsFeed">
            <h3 className="StarredComparisonsFeed__header">
                Recent Comparisons
            </h3>
            {/* <hr /> */}
            <div className="StarredComparisonsFeed__feed">
                {starredComparisons
                    .filter((tag, index) => index < fetchLimit)
                    .map((pair, index) => {
                        return <FilmComparisonCard pair={pair} key={index} />;
                    })}
            </div>
        </div>
    );
};
