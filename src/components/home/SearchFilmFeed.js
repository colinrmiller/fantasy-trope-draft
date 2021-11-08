import React from "react";
import { useState, useEffect } from "react";
import { SearchFilmCard } from "../cards/SearchFilmCard";
// import APIManager from "~/src/modules/APIManager";
import { APIManager } from "../../modules/APIManager";
import CloseIcon from '@mui/icons-material/Close';
import "./FilmFeed.css";

export const SearchFilmFeed = ({ filmList, closeSearch, searchQuery, handleClose }) => {
    // const [mainFilmList, setMainFilmList] = useState([]);
    // const [filter, setfilter] = useState("popular");

    // const API = new APIManager();
    // useEffect(() => {
    //     API.getPopular().then((res) => setMainFilmList(res.results));
    // }, []);

    return (
        <>
            <div className="SearchFilmFeed">
                <div className="FilmFeed__header">
                    <h3 className="SearchFilmFeed__header">Searching For: {searchQuery}</h3>
                    <div onClick={handleClose} className="SearchFilmFeed__close"><CloseIcon /></div>
                    <div className="SearchFilmFeed__buffer"></div>
                </div>
                <div className="SearchFilmFeed__feed">
                    {filmList?.length > 0 ? (
                        filmList.map((film) => (
                            <SearchFilmCard key={film.id} film={film} expand />
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
