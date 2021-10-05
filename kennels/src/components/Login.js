import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

export const Login = ({ setAuthUser }) => {
    const history = useHistory();

    const [user, setUser] = useState({
        name: "",
        email: "",
    });

    const handleControlledInputChange = (event) => {
        const newUser = { ...user };
        const selectedVal = event.target.value;
        newUser[event.target.id] = selectedVal;
        setUser(newUser);
    };

    const handleLoginSubmit = (event) => {
        debugger;
        // event.preventDetault();
        setAuthUser(user);
        history.push("/");
    };

    // const handleClickSaveAnimal = (event) => {
    //     event.preventDefault(); //Prevents the browser from submitting the form

    //     const locationId = animal.locationId;
    //     const customerId = animal.customerId;

    //     if (locationId === 0 || customerId === 0) {
    //         window.alert("Please select a location and a customer");
    //     } else {
    //         //invoke addAnimal passing animal as an argument.
    //         //once complete, change the url and display the animal list
    //         addAnimal(animal).then(() => history.push("/animals"));
    //         // }
    //     }

    return (
        <form className="loginForm">
            <h2 className="loginForm__title">Login</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="User name"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="your@email.com"
                    />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleLoginSubmit}>
                Login
            </button>
        </form>
    );
};
