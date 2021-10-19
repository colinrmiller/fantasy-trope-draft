import React from "react";
import { useState, useEffect } from "react";
import { FilmFeedDiscover } from "./FilmFeedDiscover";
import "./Home.css";
export const Home = () => {
    return (
        <div className="home">
            {" "}
            <div className="home__welcomeMessage">Welcome</div>
            <div className="home__FilmFeedDiscover">
                <FilmFeedDiscover />
            </div>
            <div className="home__FilmFeedDiscover">
                <FilmFeedDiscover />
            </div>
            <div className="home__tagFeed"></div>
        </div>
    );
};
