import React from "react";
import { useState, useEffect } from "react";
import { FilmCard } from "../cards/FilmCard";
// import APIManager from "~/src/modules/APIManager";
import { APIManager } from "../../modules/APIManager";
import "./FilmFeed.css";

export const SearchFilmFeed = ({ filmList, closeSearch }) => {
    // const [mainFilmList, setMainFilmList] = useState([]);
    // const [filter, setfilter] = useState("popular");

    // const API = new APIManager();
    // useEffect(() => {
    //     API.getPopular().then((res) => setMainFilmList(res.results));
    // }, []);

    return (
        <>
            <div className="FilmFeed">
                <div className="FilmFeed__header">
                    <h3>Search Results</h3>
                    <div>Close</div>
                </div>
                <div className="FilmFeed__feed">
                    {filmList?.length > 0 ? (
                        filmList.map((film) => (
                            <FilmCard key={film.id} film={film} expand />
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {/* <hr /> */}
        </>
    );
};
