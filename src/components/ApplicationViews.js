import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./home/Home";
import { FilmDetails } from "./filmDetails/FilmDetails";
import { UserPage } from "./user/UserPage";
import { Search } from "./utilities/Search";

export const ApplicationViews = () => {
    return (
        <>
            <div className="pageContainer">
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/friends">
                    {/* Render the component for list of friends */}
                </Route>
                <Route path="/messages">
                    {/* Render the component for the messages */}
                </Route>
                <Route exact path="/film-details/:filmId(\d+)">
                    <FilmDetails />
                    {/* Render the component for the user's tasks */}
                </Route>
                <Route exact path="/user/:userId(\d+)">
                    <UserPage />
                    {/* Render the component for the user's events */}
                </Route>
                <Route exact path="/search/">
                    <Search />
                    {/* Render the component for the user's events */}
                </Route>
            </div>
        </>
    );
};
