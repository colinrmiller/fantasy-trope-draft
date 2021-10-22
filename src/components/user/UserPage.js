import React from "react";
import { APIManager } from "../../modules/APIManager";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { FilmCard } from "../cards/FilmCard";
import { FilmFeed } from "../home/FilmFeed";

export const UserPage = () => {
    const API = new APIManager();
    const currentUser = sessionStorage.getItem("active_user");
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [userFilmIds, setUserFilmIds] = useState([]);
    const [userFilms, setUserFilms] = useState([]);

    useEffect(() => {
        API.getUser(userId).then((res) => setUser(res));
    }, []);

    useEffect(() => {
        API.getUserFilmIds(userId).then((res) => {
            const filmIds = res.map((film) => film.filmId);
            setUserFilmIds(filmIds);
        });
        // API.getUserFilms(userId).then((res) => setUserFilms(res));
    }, [user]);

    useEffect(() => {
        if (userFilmIds.length > 0) {
            API.getAllFilms(userFilmIds).then((res) => setUserFilms(res));
        }
        // API.getUserFilmIds(userId).then((res) => setUserFilmIds(res));
    }, [userFilmIds]);

    // useEffect(() => {
    //     userFilmIds.forEach(filmId=> {
    //         API.getFilm(filmId).then(res => {
    //             const filmsCopy = [...]
    //         }
    //     })
    //     API.getUserFilms(userId).then((res) => setUserFilmIds(res));
    // }, [user]);

    return (
        <div className="user">
            <div className="user__header">{user?.username}</div>
            <div className="FilmFeedDiscover">
                <h3 className="FilmFeedDiscover__header">
                    {user?.username + "'s Saved Films"}
                </h3>
                <div className="FilmFeedDiscover__feed">
                    <FilmFeed filmList={userFilms} header="" />
                </div>
            </div>
        </div>
    );
};
