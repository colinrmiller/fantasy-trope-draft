import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Footer } from "./footer/Footer";
import { Login } from "./auth/LoginMUI";
import { Search } from "./utilities/Search";

export const FTD = () => {
    return (
        <>
            <Route
                render={() => {
                    if (
                        sessionStorage.getItem("active_user") &&
                        sessionStorage.getItem("active_user") != "null"
                    ) {
                        return (
                            <>
                                <NavBar />
                                <Search />

                                <ApplicationViews />
                                <Footer />
                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </>
    );
};

