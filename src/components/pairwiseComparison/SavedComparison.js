import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { APIManager } from "../../modules/APIManager";
import { SavedComparisonFilmCard } from "../cards/SavedComparisonFilmCard";
import { PairwiseCommentFeed } from "./PairwiseCommentFeed";
import { Link } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "./CompareTwo.css";

export const SavedComparison = () => {
    const API = new APIManager();
    const { filmIdA, filmIdB } = useParams();
    const [filmA, setFilmA] = useState({});
    const [filmB, setFilmB] = useState({});
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    const [voted, setVoted] = useState(false);
    const [votes, setVotes] = useState(false);
    const [scoreA, setScoreA] = useState(null);
    const [scoreB, setScoreB] = useState(null);
    const [isStarred, setIsStarred] = useState(false);

    const handleChoiceA = () => {
        switch (voted) {
            case false:
                API.addUserFilmChoice(currentUser, filmA.id, filmB.id, "A")
                    .then(() => {
                        setVoted("A");
                    })
                    .then(getFilmVotes);
                break;
            case "A":
                break;
            case "B":
                API.updateUserFilmChoice(currentUser, filmA.id, filmB.id, "A")
                    .then(() => {
                        setVoted("A");
                    })
                    .then(getFilmVotes);

                break;
            default:
                break;
        }
    };

    const handleChoiceB = () => {
        switch (voted) {
            case false:
                API.addUserFilmChoice(
                    currentUser,
                    filmA.id,
                    filmB.id,
                    "B"
                ).then(() => setVoted("B"));
                break;
            case "B":
                break;
            case "A":
                API.updateUserFilmChoice(
                    currentUser,
                    filmA.id,
                    filmB.id,
                    "B"
                ).then(() => setVoted("B"));
                break;
            default:
                break;
        }
    };

    const getFilmA = () => {
        API.getFilm(filmIdA).then((res) => {
            setFilmA(res);
        });
    };

    const getFilmB = () => {
        API.getFilm(filmIdB).then((res) => {
            setFilmB(res);
        });
    };

    const getFilmChoice = () => {
        API.getUserFilmChoice(filmIdA, filmIdB, currentUser).then((res) => {
            if (res.length === 0) setVoted(false);
            else {
                if (res[0].plusFilmId == filmIdA) setVoted("A");
                if (res[0].plusFilmId == filmIdB) setVoted("B");
            }
        });
    };

    const getFilmVotes = () => {
        API.getFilmChoices(filmIdA, filmIdB).then((res) => {
            setVotes(res);
        });
    };

    const calculateScores = () => {
        if (votes) {
            const totalInitialVotes = votes.length;
            const totalVotesA = votes.filter(
                (vote) => vote.plusFilmId == filmIdA
            ).length;
            const totalVotesB = totalInitialVotes - totalVotesA;
            setScoreA(Math.floor(100 * (totalVotesA / totalInitialVotes)));
            setScoreB(Math.floor(100 * (totalVotesB / totalInitialVotes)));
        }
    };

    // const calculateNewScore = (voteDifference) => {
    //     const newTotalVotes = votes.length;
    //     setScoreA(
    //         (scoreA / 100) * totalInitialVotes +
    //             voteDifference / totalInitialVotes
    //     );
    // };

    useEffect(() => {
        getFilmA();
        getFilmB();
    }, []);

    useEffect(() => {
        getFilmChoice();
        getFilmVotes();
    }, [voted]);

    useEffect(() => {
        calculateScores();
    }, [votes]);

    return (
        <div className="savedCompareTwo">
            <div className="savedCompareTwo__compare">
                <Link className="savedCompareTwo__aside--left" to={`/film-details/${filmA.id}`}>
                    <h2 className="savedCompareTwo__title">{filmA.title}</h2>
                    <p className="savedCompareTwo__year">
                        {filmA.release_date?.slice(0, 4)}
                    </p>
                </Link>
                <div className="savedCompareTwo__filmContainer savedCompareTwo__A">
                    <SavedComparisonFilmCard
                        id="savedCompareTwo__choiceA"
                        film={filmA}
                        handleChoice={handleChoiceA}
                        isWinner={voted === "A"}
                        score={scoreA}
                    />
                </div>
                <div className="savedCompareTwo__seperator">
                    <p>OR</p>
                </div>
                <div className="savedCompareTwo__filmContainer savedCompareTwo__B">
                    <SavedComparisonFilmCard
                        id="savedCompareTwo__choiceB"
                        film={filmB}
                        handleChoice={handleChoiceB}
                        isWinner={voted === "B"}
                        score={100 - scoreA}
                    />
                </div>
                {/* <StarComparison /> */}
                <Link className="savedCompareTwo__aside--right" to={`/film-details/${filmB.id}`}>

                    <h2 className="savedCompareTwo__title">{filmB.title}</h2>
                    <p className="savedCompareTwo__text">
                        {filmB.release_date?.slice(0, 4)}{" "}
                    </p>
                    <p className="savedCompareTwo__score"></p>
                </Link>
            </div>
            <div className="savedCompareTwo__CommentFeed">
                <PairwiseCommentFeed filmIdA={filmIdA} filmIdB={filmIdB} />
            </div>
        </div>
    );
};
