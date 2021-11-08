import React from "react";
import { useState, useEffect } from "react";
import { FilmFeedDiscover } from "./FilmFeedDiscover";
import { TagActivityCard } from "../cards/TagActivityCard";
import { RecentActivity } from "./RecentActivity";
import "./Home.css";
import { FilmFeedInTheaters } from "./FilmFeedInTheaters";
import { CompareTwo } from "../pairwiseComparison/CompareTwo";
import { StarredComparisonsFeed } from "../feeds/StarredComparisonsFeed";

export const Home = () => {
    const testUserFilmTag = {
        id: 2,
        filmId: 639721,
        userId: 1,
        tagId: 2,
        rating: 1,
    };
    return (
        <div className="home">
            {" "}
            {/* <div className="home__welcomeMessage">Welcome</div> */}
            {/* <hr /> */}
            <CompareTwo />
            <hr />
            <div className="home__tagActivity">
                {/* <TagActivityCard userFilmTag={testUserFilmTag} /> */}
                <RecentActivity />
            </div>
            <div className="home__FilmFeedDiscover">
                <FilmFeedDiscover />
            </div>
            {/* <div className="home__FilmFeedDiscover">
                <FilmFeedInTheaters />
            </div> */}
            {/* <div className="home__FilmFeedDiscover">
                <FilmFeedInTheaters />
            </div> */}
            <div className="home__starredComparisons">
                <StarredComparisonsFeed />
            </div>
            <div className="home__tagFeed"></div>
        </div>
    );
};
