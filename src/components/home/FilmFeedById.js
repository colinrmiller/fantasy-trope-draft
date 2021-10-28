import React from "react";
import { useState, useEffect } from "react";
import { FilmCard } from "../cards/FilmCard";
// import APIManager from "~/src/modules/APIManager";
import { APIManager } from "../../modules/APIManager";
import "./FilmFeed.css";

export const FilmFeedById = ({ filmIdList, header }) => {
    const API = new APIManager();
    const [filmObjList, setFilmObjList] = useState([]);

    const readFilmIdList = () => {
        if (filmIdList.length > 0) {
            // debugger;
            const partialFilmList = filmIdList.filter(
                (value, index) => index < 20
            );
            return API.getAllFilmsByIdArray(partialFilmList).then((res) => {
                setFilmObjList(res);
            });
        }
    };

    useEffect(() => {
        readFilmIdList();
    }, [filmIdList]);
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
                <div className="FilmFeed__feed">
                    {filmObjList?.length > 0 ? (
                        filmObjList.map((film) => (
                            <FilmCard key={film.id} film={film} />
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <hr />
        </>
    );
};
