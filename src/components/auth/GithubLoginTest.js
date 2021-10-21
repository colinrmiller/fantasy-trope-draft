import React from "react";
import ReactDOM from "react-dom";
import LoginGithub from "react-login-github";

const onSuccess = (response) => console.log(response);
const onFailure = (response) => console.error(response);

export const GithubLoginTest = () => {
    return <div></div>;
};

ReactDOM.render(
    <LoginGithub
        clientId="8908a61955ad17d2eb29"
        onSuccess={onSuccess}
        onFailure={onFailure}
    />,
    document.getElementById("example")
);
