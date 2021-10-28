import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { LoginBypass } from "./auth/LoginBypass";
import { Register } from "./auth/Register";
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
                    if (sessionStorage.getItem("active_user")) {
                        return (
                            <>
                                <NavBar />
                                <ApplicationViews />
                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />

            <Route path="/login">
                {/* <Login /> */}
                <LoginBypass />
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
