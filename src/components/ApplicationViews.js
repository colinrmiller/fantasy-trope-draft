import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./home/Home";
import { FilmDetails } from "./filmDetails/FilmDetails";
import { SavedComparison } from "./pairwiseComparison/SavedComparison";
import { UserPage } from "./user/UserPage";
import { Search } from "./utilities/Search";
import { Friends } from "./user/Friends";

export const ApplicationViews = () => {
    return (
        <>
            <div className="pageContainer">
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/friends">
                    <Friends />
                    {/* Render the component for list of friends */}
                </Route>
                <Route path="/messages">
                    {/* Render the component for the messages */}
                </Route>
                <Route exact path="/film-details/:filmId(\d+)">
                    <FilmDetails />
                    {/* Render the component for the user's tasks */}
                </Route>
                <Route exact path="/comparison/:filmIdA(\d+)/:filmIdB(\d+)">
                    <SavedComparison />
                    {/* Render the component for the user's tasks */}
                </Route>
                <Route exact path="/user/:userId(\d+)">
                    <UserPage />
                    {/* Render the component for the user's events */}
                </Route>
                <Route exact path="/search/">
                    {/* Render the component for the user's events */}
                </Route>
            </div>
        </>
    );
};
