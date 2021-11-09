import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./login.css";
const theme = createTheme();

export const Register = () => {
    const [conflictDialog, setConflictDialog] = useState(false);

    const history = useHistory();

    const existingUserCheck = (email) => {
        // If your json-server URL is different, please change it below!
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then((res) => res.json())
            .then((user) => !!user.length);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        existingUserCheck(data.get("email")).then((userExists) => {
            if (!userExists) {
                // If your json-server URL is different, please change it below!
                fetch("http://localhost:8088/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: data.get("email"),
                        firstName: `${data.get("firstName")} `,
                        lastName: `${data.get("lastName")}`,
                        username: `${data.get("username")}`,
                    }),
                })
                    .then((res) => res.json())
                    .then((createdUser) => {
                        if (createdUser.hasOwnProperty("id")) {
                            // The user id is saved under the key active_user in session Storage. Change below if needed!
                            sessionStorage.setItem(
                                "active_user",
                                createdUser.id
                            );
                            history.push("/");
                        }
                    });
            } else {
                setConflictDialog(true);
            }
        });
    };

    return (
        <div className="login">
            <ThemeProvider theme={theme}>
                <Container
                    component="main"
                    maxWidth="xs"
                    className="login__main"
                >
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
                            Sign up
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Display Name"
                                        name="username"
                                        autoComplete="username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="allowExtraEmails"
                                            color="primary"
                                        />
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                /> */}
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs>
                                    <div
                                        variant="body2"
                                        className="login__notFound"
                                    >
                                        {conflictDialog
                                            ? "Email address taken"
                                            : null}
                                    </div>
                                </Grid>

                                <Grid item>
                                    <Link href="#" variant="body2" to="/login">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
};
