import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { LoginBypass } from "./auth/LoginBypass";
import { Register } from "./auth/Register";

export const FTD = () => (
    <>
        <Route
            render={() => {
                if (sessionStorage.getItem("active_user")) {
                    return (
                        <>
                            <NavBar />
                            <ApplicationViews />
                        </>
                    );
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />

        <Route path="/login">
            {/* <Login /> */}
            <LoginBypass />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
);
