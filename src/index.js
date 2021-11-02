import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { FTD } from "./components/FTD";

// import React from "react";
import firebase from "firebase/compat/app";

// import logo from "./logo.svg";
// import "./App.css";

import "firebase/auth";
import "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
} from "firebase/firestore/lite";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCWzgfdRPNUopHmO-hUbC1ly7XrLGz0PxI",
    authDomain: "screendraft-ce527.firebaseapp.com",
    projectId: "screendraft-ce527",
    storageBucket: "screendraft-ce527.appspot.com",
    messagingSenderId: "236042260388",
    appId: "1:236042260388:web:a5e1318e0c884cfe95fb31",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const dbContext = createContext(db);
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <FTD />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// TEST : https://jasonwatmore.com/post/2020/10/28/react-facebook-how-to-use-the-facebook-sdk-in-a-react-app

// // import React from "react";
// // import { Router } from "react-router-dom";
// import { render } from "react-dom";

// // global stylesheet
// import "./index.css";

// import { initFacebookSdk } from "./components/utilities/ImportFacebookSDKTest";
// // import { jwtInterceptor, errorInterceptor, history } from "./_helpers";
// // import { App } from "./App";

// // setup fake backend
// // import { fakeBackend } from "./_helpers";
// // fakeBackend();

// // enable interceptors for http requests
// // jwtInterceptor();
// // errorInterceptor();

// // wait for facebook sdk before startup
// // initFacebookSdk().then(startApp);
// startApp();
// const startApp = () => (
//     ReactDOM.render(
//         <React.StrictMode>
//             <Router>
//                 <FTD />
//             </Router>
//         </React.StrictMode>
//     ),
//     document.getElementById("root")
// );

// /// END TEST
