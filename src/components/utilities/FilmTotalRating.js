import React from "react";
import { useState, useEffect } from "react";
import { FilmRanking } from "../utilities/FilmRanking";
import { useParams } from "react-router";

import { APIManager } from "../../modules/APIManager";
import "./misc.css";

export const FilmTotalRating = ({ film }) => {
    const API = new APIManager();
    const { filmId } = useParams();

    const [rank, setRank] = useState(0);
    const [allRatings, setAllRatings] = useState([]);

    const getAllRankings = () => {
        API.getAllRatedFilmPairs().then((res) => {
            setAllRatings(FilmRanking(res));
        });
    };

    const getRank = () => {
        let index = 1;
        allRatings.forEach((value, key) => {
            if (key == filmId) {
                setRank(index);
            } else {
                index += 1;
            }
        });
    };

    useEffect(() => {
        getAllRankings();
    }, []);

    useEffect(() => {
        getRank();
    }, [allRatings]);

    return (
        <div className="filmTotalRating">
            {rank !== 0 ? `#${rank} in ScreenDraft` : null}{" "}
        </div>
    );
};
