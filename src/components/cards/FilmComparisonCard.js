import React, { useState, useEffect } from "react";
import { TagAPIManager } from "../../modules/TagAPIManager";
import { APIManager } from "../../modules/APIManager";
import { FilmImg } from "./FilmImg";
import { CommentTagCard } from "../cards/CommentTagCard";
import { Link } from "react-router-dom";
import "./Cards.css";
export const FilmComparisonCard = ({ pair }) => {
    const API = new APIManager();
    const TagAPI = new TagAPIManager();
    const currentUser = parseInt(sessionStorage.getItem("active_user"));

    const filmAId = pair?.filmA;
    const filmBId = pair?.filmB;
    const userId = pair?.userId;
    const [filmA, setFilmA] = useState({});
    const [filmB, setFilmB] = useState({});
    const [user, setUser] = useState({});
    const [voted, setVoted] = useState(false);
    const [vote, setVote] = useState(null);

    const getFilms = () => {
        API.getFilm(filmAId).then((res) => {
            setFilmA(res);
        });
        API.getFilm(filmBId).then((res) => {
            setFilmB(res);
        });
    };

    const getUser = () => {
        API.getUser(userId).then((res) => {
            setUser(res);
        });
    };

    // set state for voted and vote
    const getVoted = () => {
        API.getUserComparison(currentUser, pair).then((res) => {
            if (res.length > 0) {
                setVoted(true);
                if (res.plusFilmId === filmAId) {
                    setVote("A");
                } else setVote("B");
            }
        });
    };

    const handleChoiceA = () => {
        if (!voted) {
            API.addUserFilmChoice(currentUser, filmA.id, filmB.id, "A").then(
                () => setVoted(true)
            );
        }
    };

    const handleChoiceB = () => {
        if (!voted) {
            API.addUserFilmChoice(currentUser, filmA.id, filmB.id, "B").then(
                () => setVoted(true)
            );
        }
    };

    useEffect(() => {
        getFilms();
        getUser();
        getVoted();
    }, []);

    return (
        <div className="filmComparisonCard">
            <div className="filmComparisonCard__filmContainer filmComparisonCard__A">
                <FilmImg
                    id="filmComparisonCard__choiceA"
                    film={filmA}
                    handleChoice={handleChoiceA}
                    isWinner={vote === "A" && vote}
                />
            </div>
            <div className="filmComparisonCard__seperator">
                <p>OR</p>
            </div>
            <div className="filmComparisonCard__filmContainer filmComparisonCard__B">
                <FilmImg
                    id="filmComparisonCard__choiceB"
                    film={filmB}
                    handleChoice={handleChoiceB}
                    isWinner={vote === "A" && vote}
                />
            </div>
        </div>
    );
};
