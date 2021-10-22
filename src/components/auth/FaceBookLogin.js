import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import FacebookLogin from "react-facebook-login";
import { useState } from "react";
export const FaceBookLogin = () => {
    const [responseParams, setResponse] = useState({});
    const [lastName, setLastName] = useState();

    useEffect(() => {
        window.FB.getLoginStatus(function (response) {
            setResponse(response);
            console.log(response);
            if (response) {
                sessionStorage.setItem("FB_Id", response.authResponse.userID);
                getFBPicture();
                getFBName();
            }
        });
    }, []);

    useEffect(() => {
        getFBPicture();
    }, [responseParams]);

    const responseFacebook = (response) => {
        console.log(response);
    };

    const getFBPicture = () => {
        window.FB.api("/me", { fields: "picture" }, function (response) {
            // setLastName(response);
            sessionStorage.setItem("FB_Picture", response.picture.data.url);
        });
    };

    const getFBName = () => {
        window.FB.api("/me", function (response) {
            setLastName(response);
            sessionStorage.setItem("FB_Name", response.name);
        });
    };

    const componentClicked = () => {};

    return (
        <div>
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
            />
            {/* , document.getElementById('demo') */}
        </div>
    );
};
