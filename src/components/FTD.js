import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Footer } from "./footer/Footer";
// import { Login } from "./auth/Login";
import { Login } from "./auth/LoginMUI";
// import { Login } from "./auth/TestLogin";
import { LoginBypass } from "./auth/LoginBypass";
// import { Register } from "./auth/Register";
import { Register } from "./auth/RegisterMUI";
import { Search } from "./utilities/Search";
// import { RewriteJSON } from "./utilities/RewriteTags";
// import { GithubLogin } from "./auth/GithubLogin";

// import { createContext, useReducer } from "react";
// import { BrowserRouter as Router, Switch } from "react-router-dom";
// import { initialState, reducer } from "../store/reducer";

// export const AuthContext = createContext();

export const FTD = () => {
    // const [state, dispatch] = useReducer(reducer, initialState);
    // RewriteJSON();
    return (
        <>
            {/* <AuthContext.Provider
                value={{
                    state,
                    dispatch,
                }}
            > */}
            <Route
                render={() => {
                    if (
                        sessionStorage.getItem("active_user") &&
                        sessionStorage.getItem("active_user") != "null"
                    ) {
                        return (
                            <>
                                <NavBar />
                                <Search />

                                <ApplicationViews />
                                <Footer />
                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />

            <Route path="/login">
                <Login />

                {/* <LoginBypass /> */}
                {/* <GithubLogin /> */}
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            {/* </AuthContext.Provider> */}
        </>
    );
};

// function App() {

//     return (
//         <Router>
//             <Switch>
//                 <Route path="/login" component={Login} />
//                 <Route path="/" component={Home} />
//             </Switch>
//         </Router>
//     );
// }

// export default App;
