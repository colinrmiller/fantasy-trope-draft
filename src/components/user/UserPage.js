import React from "react";
import { APIManager } from "../../modules/APIManager";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { FilmCard } from "../cards/FilmCard";
import { FilmFeed } from "../home/FilmFeed";
import { AddUser } from "./AddUser";
import { DisplayRankings } from "./DisplayRankings";
import { FilmFeedNoSavedFilms } from "../feeds/FilmFeedNoSavedFilms";
import { UserRecentTagActivity } from "../home/UserRecentTagActivity";
// import { Rankings } from "../dataViz/RankingScatterplot";

import "./UserPage.css";

export const UserPage = () => {
    const API = new APIManager();
    const currentUser = sessionStorage.getItem("active_user");
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [userFilmIds, setUserFilmIds] = useState([]);
    const [userFilms, setUserFilms] = useState([]);

    useEffect(() => {
        API.getUser(userId).then((res) => setUser(res));
    }, [userId]);

    useEffect(() => {
        API.getUserFilmIds(userId).then((res) => {
            const filmIds = res.map((film) => film.filmId);
            setUserFilmIds(filmIds);
        });
        // API.getUserFilms(userId).then((res) => setUserFilms(res));
    }, [user]);

    useEffect(() => {
        if (userFilmIds.length > 0) {
            API.getAllFilmsByIdArray(userFilmIds).then((res) =>
                setUserFilms(res)
            );
        } else setUserFilms([]);
        // API.getUserFilmIds(userId).then((res) => setUserFilmIds(res));
    }, [userFilmIds]);

    const isCurrentUser = currentUser == userId;

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
            <div className="user__header">
                <h2 className="user_username">{user?.username}</h2>
                <AddUser
                    isFollowing={true}
                    hidden={isCurrentUser}
                    userId={userId}
                />
            </div>
            <DisplayRankings userId={user.id} />
            {/* <Rankings /> */}
            {/* <div className="FilmFeedDiscover">
                <h3 className="FilmFeed__header">
                    {user?.username + "'s Saved Films"}
                </h3> */}
            <div className="userPage__recentTagActivity">
                <UserRecentTagActivity userId={userId} />
            </div>
            <div className="FilmFeed__feed">
                {userFilms.length > 0 ? (
                    <FilmFeed
                        filmList={userFilms}
                        header={user?.username + "'s Saved Films"}
                    />
                ) : (
                    <FilmFeedNoSavedFilms />
                )}
            </div>
            {/* </div> */}
        </div>
    );
};
