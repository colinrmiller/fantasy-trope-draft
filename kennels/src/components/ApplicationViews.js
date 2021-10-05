import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./Home";
import { AnimalList } from "./animals/AnimalList";
import { AnimalDetail } from "./animal/AnimalDetail";
import { AnimalForm } from "./animal/AnimalForm";
import { AnimalEditForm } from "./animal/AnimalEditForm";
import { EmployeeList } from "./employees/EmployeeList";
import { LocationList } from "./locations/LocationList";
import { LocationDetail } from "./locations/LocationDetail";
import { LocationForm } from "./locations/LocationForm";
import { CustomerList } from "./customers/CustomerList";
import { CustomerDetail } from "./customers/CustomerDetail";
import { CustomerForm } from "./customers/CustomerForm";
import { Login } from "./Login";
import { Redirect } from "react-router";
// import { useState } from "react";

export const ApplicationViews = ({ isAuthenticated, setAuthUser }) => {
    // const [isAuthenticated, setIsAuthenticated] = useState(
    //     sessionStorage.getItem("kennel_customer") !== null
    // );

    // const setAuthUser = (user) => {
    //     sessionStorage.setItem("kennel_customer", JSON.stringify(user));
    //     setIsAuthenticated(sessionStorage.getItem("kennel_customer") !== null);
    // };

    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                {isAuthenticated ? <Home /> : <Redirect to="/login" />}
            </Route>

            {/* Make sure you add the `exact` attribute here */}
            <Route exact path="/animals">
                {isAuthenticated ? <AnimalList /> : <Redirect to="/login" />}
            </Route>

            <Route exact path="/animals/:animalId(\d+)">
                <AnimalDetail />
            </Route>

            <Route path="/animals/create">
                <AnimalForm />
            </Route>

            <Route path="/animals/:animalId(\d+)/edit">
                <AnimalEditForm />
                {isAuthenticated ? "" : <Redirect to="/login" />}
            </Route>

            <Route exact path="/locations">
                <LocationList />
            </Route>

            <Route path="/locations/:locationId(\d+)">
                <LocationDetail />
            </Route>

            <Route path="/locations/create">
                <LocationForm />
            </Route>

            <Route path="/employees">
                <EmployeeList />
            </Route>

            <Route exact path="/customers">
                <CustomerList />
            </Route>

            <Route path="/customers/:customerId(\d+)">
                <CustomerDetail />
            </Route>

            <Route path="/customers/create">
                <CustomerForm />
            </Route>

            <Route path="/login">
                <Login setAuthUser={setAuthUser} />
            </Route>
        </>
    );
};
