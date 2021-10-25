import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import { useEffect } from "react";
import { FaceBookLogin } from "./FaceBookLogin";

export const Login = () => {
    const [loginUser, setLoginUser] = useState({ email: "" });
    const [existDialog, setExistDialog] = useState(false);

    const history = useHistory();

    const handleInputChange = (event) => {
        const newUser = { ...loginUser };
        newUser[event.target.id] = event.target.value;
        setLoginUser(newUser);
    };

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${loginUser.email}`)
            .then((res) => res.json())
            .then((user) => (user.length ? user[0] : false));
    };

    const handleLogin = (event) => {
        event.preventDefault();

        existingUserCheck().then((exists) => {
            if (exists) {
                // The user id is saved under the key active_user in session Storage. Change below if needed!
                sessionStorage.setItem("active_user", exists.id);
                history.push("/");
            } else {
                setExistDialog(true);
            }
        });
    };

    // FaceBook Integration
    // FB.getLoginStatus(function (response) {
    //     statusChangeCallback(response);
    // });

    return (
        <main className="login">
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>User does not exist</div>
                <button
                    className="button--close"
                    onClick={(e) => setExistDialog(false)}
                >
                    Close
                </button>
            </dialog>
            <section>
                <h1>Screen Draft</h1>
                <form className="login__form" onSubmit={handleLogin}>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required
                            autoFocus
                            value={loginUser.email}
                            onChange={handleInputChange}
                        />
                    </fieldset>
                    <fieldset>
                        <button type="login__form--submit">Sign in</button>
                    </fieldset>
                    <FaceBookLogin />
                </form>
            </section>
            <section className="login--registerLink">
                <Link to="/register">Register for an account</Link>
            </section>
        </main>
    );
};
