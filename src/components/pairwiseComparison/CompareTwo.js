import React from "react";
import { useState, useEffect } from "react";
import { APIManager } from "../../modules/APIManager";
import { FilmCardChoose } from "../cards/FilmCardChoose";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "./CompareTwo.css";

export const CompareTwo = () => {
    const API = new APIManager();
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    const [filmA, setFilmA] = useState({});
    const [filmB, setFilmB] = useState({});
    const [voted, setVoted] = useState(false);
    const [ratedFilmPairs, setRatedFilmPairs] = useState([]);
    const [isStarred, setIsStarred] = useState(false);

    const getRatedFilmPairs = () => {
        API.getRatedFilmPairs(currentUser).then((res) => {
            setRatedFilmPairs(res);
        });
    };

    const filterForAlreadyRated = (filmIdA, filmIdB) => {
        let alreadyRated = false;
        if (filmIdA && filmIdB) {
            ratedFilmPairs.forEach((filmPair) => {
                // check if film has already been rated by User
                if (
                    (filmPair.plusFilmId === filmIdA &&
                        filmPair.minusFilmId === filmIdB) ||
                    (filmPair.plusFilmId === filmIdB &&
                        filmPair.minusFilmId === filmIdA)
                ) {
                    alreadyRated = true;
                }
                console.log(
                    "CheckAlreadyRated",
                    filmPair,
                    filmIdA,
                    filmIdB,
                    alreadyRated
                );
            });
        }
        return alreadyRated;
    };

    const handleStarComparison = () => {
        setIsStarred(!isStarred);
        if (!isStarred) {
            API.addStarredComparison(currentUser, filmA.id, filmB.id);
        }
    };

    const StarComparison = () => {
        return (
            <div className="compareTwo__starComparison">
                {isStarred ? (
                    <BookmarkBorderIcon
                        sx={{ color: "gold" }}
                        onClick={() => handleStarComparison()}
                    />
                ) : (
                    <BookmarkBorderIcon
                        onClick={() => handleStarComparison()}
                    />
                )}
            </div>
        );
    };

    const handleChoiceA = () => {
        API.addUserFilmChoice(currentUser, filmA.id, filmB.id, "A").then(() =>
            setVoted(true)
        );
    };

    const handleChoiceB = () => {
        API.addUserFilmChoice(currentUser, filmA.id, filmB.id, "B").then(() =>
            setVoted(true)
        );
    };

    const getFilms = () => {
        getFilmA();
        getFilmB();
    };

    const getFilmA = () => {
        API.getRandomFilm().then((res) => {
            setFilmA(res);
        });
    };

    const getFilmB = () => {
        API.getRandomFilm().then((res) => {
            setFilmB(res);
        });
        setIsStarred(false);
    };

    useEffect(() => {
        getRatedFilmPairs();
    }, []);

    useEffect(() => {
        getFilms();
    }, []);

    useEffect(() => {
        if (filterForAlreadyRated(filmA.id, filmB.id)) {
            getFilms();
        }
    }, [filmA, filmB]);

    useEffect(() => {
        if (filmA.id === filmB.id) {
            getFilmB();
        }
    }, [filmA, filmB]);

    useEffect(() => {
        if (voted) {
            getFilms();
            setVoted(false);
        }
    }, [voted]);

    return (
        <div className="compareTwo">
            <div className="compareTwo__compare">
                <div className="compareTwo__filmContainer compareTwo__A">
                    <FilmCardChoose
                        id="compareTwo__choiceA"
                        film={filmA}
                        handleChoice={handleChoiceA}
                        handleGetNewFilm={getFilmA}
                    />
                </div>
                <div className="compareTwo__seperator">
                    <p>OR</p>
                </div>
                <div className="compareTwo__filmContainer compareTwo__B">
                    <FilmCardChoose
                        id="compareTwo__choiceB"
                        film={filmB}
                        handleChoice={handleChoiceB}
                        handleGetNewFilm={getFilmB}
                    />
                </div>
                <StarComparison />
            </div>
        </div>
    );
};
