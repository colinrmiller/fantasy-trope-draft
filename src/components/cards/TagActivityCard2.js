import React, { useState, useEffect } from "react";
import { TagAPIManager } from "../../modules/TagAPIManager";
import { APIManager } from "../../modules/APIManager";
import { FilmCard } from "./FilmCard";
import { CommentTagCard } from "../cards/CommentTagCard";
import { Link } from "react-router-dom";
import "./Cards.css";
export const TagActivityCard2 = ({ userFilmTag }) => {
    const API = new APIManager();
    const TagAPI = new TagAPIManager();

    const filmId = userFilmTag?.filmId;
    const userId = userFilmTag?.userId;
    const [tagList, setTagList] = useState([]);
    const [film, setFilm] = useState({});
    const [user, setUser] = useState({});

    const getFilm = () => {
        API.getFilm(filmId).then((res) => {
            setFilm(res);
        });
    };
    const getUser = () => {
        API.getUser(userId).then((res) => {
            setUser(res);
        });
    };

    const getUserFilmTagList = () => {
        TagAPI.getUserFilmTagList(userId, filmId)
            .then((embeddedTagList) => embeddedTagList.map((tag) => tag.tag))
            .then((res) => {
                setTagList(res);
            });
    };

    const handleUserClicked = () => {};

    useEffect(() => {
        getFilm();
        getUser();
        getUserFilmTagList();
    }, []);

    return (
        <div className="tagActivityCard2">
            <div className="tagActivityCard__filmCard">
                <FilmCard film={film} />
            </div>
            <div className="tagActivityCard__body">
                <div className="tagActivityCard__header">
                    <h3 className="tagActivity__header--filmTitle">
                        {film?.title}
                    </h3>
                    <Link to={"/user/" + user?.id}>
                        <h5 className="tagActivity__header--user">
                            {user?.username}
                        </h5>
                    </Link>
                </div>
                <div className="tagActivityCard__info">
                    <div className="tagActivityCard__tagList">
                        {tagList.map((tag) => (
                            <CommentTagCard
                                tag={tag}
                                filmId={filmId}
                                key={tag?.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
