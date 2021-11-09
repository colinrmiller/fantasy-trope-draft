import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { FTD } from "./components/FTD";

// import React from "react";

// import logo from "./logo.svg";
// import "./App.css";

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
