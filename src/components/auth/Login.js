import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import "./login.css"
import { useEffect } from "react";

// extra
import { APIManager } from "../../modules/APIManager";
export const Login = () => {
    const [loginUser, setLoginUser] = useState({ email: "" })
    const [existDialog, setExistDialog] = useState(false)

    const history = useHistory()

    // TEST
    const [movie, setMovie] = useState({})
    const API = new APIManager()
    useEffect(() => {
        API.getMovie(551).then(movie => setMovie(movie))
    })
    // END

    

    const handleInputChange = (event) => {
        const newUser = { ...loginUser }
        newUser[event.target.id] = event.target.value
        setLoginUser(newUser)
    }
    


    const existingUserCheck = () => {
        // If your json-server URL is different, please change it below!
        return fetch(`http://localhost:8088/users?email=${loginUser.email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    // The user id is saved under the key nutshell_user in session Storage. Change below if needed!
                    sessionStorage.setItem("userId", exists.id)
                    history.push("/")
                } else {
                    setExistDialog(true)
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => setExistDialog(false)}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Fantasy Trope Draft</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus
                            value={loginUser.email}
                            onChange={handleInputChange} />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Register for an account</Link>
            </section>
            <section className="example_display">
                <h2> Example API Call</h2>
                <h3>{movie?.title}</h3>
                <img src={"https://image.tmdb.org/t/p/original" + movie?.poster_path} style={{"height": "250px"}}/>
                <p>{movie?.overview}</p>
            </section>
        </main>
    )
}