import React from "react";
import { useState, useEffect } from "react";
import { FilmCard } from "../cards/FilmCard";
// import APIManager from "~/src/modules/APIManager";
import { APIManager } from "../../modules/APIManager";
import "./FilmFeed.css";

export const FilmFeedInTheaters = () => {
    const [mainFilmList, setMainFilmList] = useState([]);
    const [filter, setfilter] = useState("popular");

    const API = new APIManager();
    useEffect(() => {
        API.getInTheaters().then((res) => setMainFilmList(res.results));
    }, []);

    return (
        <div className="FilmFeed">
            <h3 className="FilmFeed__header">{filter}</h3>
            <div className="FilmFeed__feed">
                {mainFilmList.map((film) => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </div>
        </div>
    );
};
