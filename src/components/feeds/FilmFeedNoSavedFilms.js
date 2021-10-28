import React from "react";
import { useState, useEffect } from "react";
import { FilmCard } from "../cards/FilmCard";
// import APIManager from "~/src/modules/APIManager";
import { APIManager } from "../../modules/APIManager";
import "../home/FilmFeed.css";

export const FilmFeedNoSavedFilms = ({ filmList, header }) => {
    // const [mainFilmList, setMainFilmList] = useState([]);
    // const [filter, setfilter] = useState("popular");

    // const API = new APIManager();
    // useEffect(() => {
    //     API.getPopular().then((res) => setMainFilmList(res.results));
    // }, []);

    return (
        <>
            <hr />
            <div className="FilmFeed">
                <h3 className="FilmFeed__header">{header}</h3>
                <div className="filmFeedNoSavedFilms">
                    <h3>No Saved Films</h3>
                </div>
            </div>
            <hr />
        </>
    );
};
