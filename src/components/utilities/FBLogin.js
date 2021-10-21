import React from "react";
import FacebookLogin from "react-facebook-login";
import { useState } from "react";
// This is the callback. It calls FB.getLoginStatus() to get the most recent login state. (statusChangeCallback() is a function that's part of the example that processes the response.)

// FB: get login status
// FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });
// -- ex response{
// status: 'connected',
//     authResponse: {
//         accessToken: '...',
//         expiresIn:'...',
//         signedRequest:'...',
//         userID:'...'
//     }
// }

export const FBLogin = ({ setFacebookLogin }) => {
    // debugger;
    const [fbData, setFbData] = useState({
        isLoggedIn: false,
        userId: "",
        name: "",
        email: "",
        picture: "",
    });
    const [response, setResponse] = useState({});

    // function checkLoginState() {
    //     FB.getLoginStatus(function (response) {
    //         setFacebookLogin(response);
    //     });
    // }

    const facebookResponse = (response) => {
        console.log(response);
        setResponse(response);
        const FbDataCopty = { ...fbData };
        FbDataCopty["name"] = response.name;
        FbDataCopty["userId"] = response.id;
        setFbData(FbDataCopty);
        sessionStorage.setItem("fb_id", response.id);
    };

    const handleClick = () => {};

    return (
        <>
            <div className="">facebook</div>
            <FacebookLogin
                appId="4793818230651468"
                autoLoad={true}
                fields="name,email,picture"
                onClick={handleClick}
                callback={facebookResponse}
            />
        </>
    );
};
