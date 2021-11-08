import React from "react";
import { useState, useEffect } from "react";
import { APIManager } from "../../modules/APIManager";
import { FilmCardChoose } from "../cards/FilmCardChoose";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Link } from "react-router-dom";
import "./CompareTwo.css";

export const CompareTwo = () => {
    const API = new APIManager();
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    const [filmA, setFilmA] = useState({});
    const [filmB, setFilmB] = useState({});
    const [loaded, setLoaded] = useState(false);
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
        setLoaded(false);
        getFilms();
    }, []);

    useEffect(() => {
        if (filterForAlreadyRated(filmA.id, filmB.id)) {
            getFilms();
        }
    }, [filmA, filmB]);

    useEffect(() => {
        if (filmA.id === filmB.id) {
            setLoaded(false);
            getFilmB();
        }
    }, [filmA, filmB]);

    useEffect(() => {
        if (voted) {
            getFilms();
            setVoted(false);
        }
    }, [voted]);

    useEffect(() => {
        // function delay(t, v) {
        //     return new Promise(function (resolve) {
        //         setTimeout(resolve.bind(null, v), t);
        //     });
        // }
        // setLoaded(false);
        setTimeout(() => {
            setLoaded(true);
        }, 1300);
    }, [filmA, filmB]);

    return (
        <div className="compareTwo">
            <div className="compareTwo__compare">
                {loaded ? (
                    <>
                        <Link
                            className="savedCompareTwo__aside--left"
                            to={`/film-details/${filmA.id}`}
                        >
                            <h2 className="savedCompareTwo__title">
                                {filmA.title}
                            </h2>
                            <p className="savedCompareTwo__year">
                                {filmA.release_date?.slice(0, 4)}
                            </p>
                        </Link>

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
                        <Link
                            className="savedCompareTwo__aside--right"
                            to={`/film-details/${filmB.id}`}
                        >
                            <h2 className="savedCompareTwo__title">
                                {filmB.title}
                            </h2>
                            <p className="savedCompareTwo__text">
                                {filmB.release_date?.slice(0, 4)}{" "}
                            </p>
                            <p className="savedCompareTwo__score"></p>
                        </Link>
                    </>
                ) : (
                    <div className="compareTwo__seperator compareTwo__seperator--loading">
                        <p>loading...</p>
                    </div>
                )}

                <StarComparison />
            </div>
        </div>
    );
};
