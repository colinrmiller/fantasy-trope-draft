import React from "react";
import { useState, useEffect } from "react";
import { APIManager } from "../../modules/APIManager";
import { FilmRanking } from "../utilities/FilmRanking";
import { FilmFeedById } from "../home/FilmFeedById";
import { RankingScatterplot } from "../dataViz/RankingScatterplot";
import { useParams } from "react-router";
export const DisplayRankings = () => {
    const API = new APIManager();
    const currentUser = parseInt(sessionStorage.getItem("active_user"));

    const [rankedFilms, setRankedFilms] = useState([]);
    const [userComparisons, setUserComparisons] = useState([]);
    const [rankedFilmIdList, setRankedFilmIdList] = useState([]);
    const [filmRankPairs, setFilmRankPairs] = useState([]);
    const [user, setUser] = useState([]);
    const { userId } = useParams();

    const getRankedFilms = (filmComparisons) => {
        setRankedFilms(FilmRanking(filmComparisons));
    };

    const getUserComparisons = () => {
        return API.getRatedFilmPairs(currentUser).then((res) =>
            setUserComparisons(res)
        );
    };

    // read ratedFilmIdList and
    const getRankedFilmIdList = () => {
        const filmList = [...rankedFilms].map(
            (filmRatingPair) => filmRatingPair[0]
        );
        setRankedFilmIdList(filmList);

        const filmRankPairList = [...rankedFilms].map(
            (filmRatingPair, index) => {
                return {
                    index: index,
                    filmId: filmRatingPair[0],
                    valuation: filmRatingPair[1],
                };
            }
        );
        setFilmRankPairs(filmRankPairList);
    };

    useEffect(() => {
        getUserComparisons();
    }, []);

    useEffect(() => {
        getRankedFilms(userComparisons);
    }, [userComparisons]);

    useEffect(() => {
        getRankedFilmIdList();
    }, [rankedFilms]);

    useEffect(() => {
        API.getUser(userId).then((res) => {
            setUser(res);
        });
    }, [userId]);

    return (
        <div className="displayRankings">
            <FilmFeedById
                filmIdList={rankedFilmIdList}
                header={user.username + "'s Favorite Films"}
            />
            {/* <RankingScatterplot filmRankPairs={filmRankPairs} /> */}
        </div>
    );
};
