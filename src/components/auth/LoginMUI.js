import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./testLogin.css";

import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const theme = createTheme();

export const Login = () => {
    const [doesntExistDialog, setDoesntExistDialog] = useState(false);

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });

        existingUserCheck(data.get("email")).then((exists) => {
            if (exists) {
                // The user id is saved under the key active_user in session Storage. Change below if needed!
                sessionStorage.setItem("active_user", exists.id);
                history.push("/");
            } else {
                setDoesntExistDialog(true);
            }
        });
    };

    const existingUserCheck = (email) => {
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then((res) => res.json())
            .then((user) => (user.length ? user[0] : false));
    };

    // const handleLogin = (event) => {
    //     event.preventDefault();

    //     existingUserCheck().then((exists) => {
    //         if (exists) {
    //             // The user id is saved under the key active_user in session Storage. Change below if needed!
    //             sessionStorage.setItem("active_user", exists.id);
    //             history.push("/");
    //         } else {
    //             setExistDialog(true);
    //         }
    //     });
    // };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" className="login__main">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: "20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <div
                                    variant="body2"
                                    className="login__notFound"
                                >
                                    {doesntExistDialog
                                        ? "Email Or Password Incorrect"
                                        : null}
                                </div>
                            </Grid>
                            <Grid item>
                                <Link
                                    href="#"
                                    variant="body2"
                                    // className="login__signUp"
                                    to="/register"
                                >
                                    Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
