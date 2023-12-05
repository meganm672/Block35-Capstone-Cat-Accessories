// we might not need auth/login

import { useState } from "react";

import { Stack, Button, Paper, TextField, Typography, Link, Snackbar, IconButton, Alert, AlertTitle } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { useLoginMutation, useRegisterMutation } from '../redux/api'
import { useNavigate } from "react-router-dom";

const Login_register = () => {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const [login] = useLoginMutation();

    const [type, setType] = useState("login");

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    // const [successMessage, setSuccessMessage] = useState(null);

    // snack bar message
    const [open, setOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (type === "register") {
                await register({ name: fullName, username, password });
                // setSuccessMessage("Registration successful!");
                setOpen(true)
                setTimeout(() => navigate('/'), 2000);
            }

            if (type === "login") {
                await login({ username, password });
                // setSuccessMessage("Login successful!");
                setOpen(true)
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (error) {
            console.error("Error:", error.message);
            // Handle errors as needed
        }

    }
    // for the snack bar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    // for the snack bar box
    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    ) 

    return (
        <Paper elevation={6} sx={{ width: "50%", padding: 4, margin: "14px auto" }}>
            <form onSubmit={handleSubmit}>
                {/* {successMessage && <Typography variant="h5" sx={{ textAlign: "center", padding: 1 }}>{successMessage}</Typography>} */}
                <Stack direction="column">
                    <Typography
                        variant="h5"
                        sx={{ textAlign: "center" }}
                    >
                        {type === "login" ? "Log In" : "Register"}
                    </Typography>
                    {type === "register" && <TextField
                        label="Name"
                        onChange={e => setFullName(e.target.value)}
                        value={fullName}
                        sx={{ margin: "8px 0" }} />}
                    <TextField
                        label="Username"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        sx={{ margin: "8px 0" }} />
                    <TextField
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        sx={{ margin: "8px 0" }}
                        type="password" />

                    {type === "register" && <TextField
                        label="Re-Enter Password"
                        onChange={e => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                        type="password"
                        error={!!(password && repeatPassword && password !== repeatPassword)}
                        helperText={password && repeatPassword && password !== repeatPassword ? "Password must match" : null} />}
                </Stack>
                <Button
                    variant="contained"
                    size="large"
                    sx={{ margin: "8px 0", width: "100%", "&:hover": { bgcolor: "magenta", color: "white" } }}
                    type="submit"
                >
                    {type === "login" ? "Log In" : "Register"}
                </Button>
                {type == "login" &&
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        action={action}
                    >
                        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                            <AlertTitle>Success</AlertTitle>
                            Login Successful!
                        </Alert>
                    </Snackbar>
                }
                {type == "register" &&
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        action={action}
                    >
                        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                            <AlertTitle>Success</AlertTitle>
                            Registration successful!
                        </Alert>
                    </Snackbar>
                }
                {type === "login"
                    ? (
                        <Typography>Need to create an account?{" "}
                            <Link href="#" onClick={() => setType("register")}>
                                Register</Link>
                        </Typography>
                    ) : (
                        <Typography>Already have an account?{" "}
                            <Link href="#" onClick={() => setType("login")}>
                                Log In</Link>
                        </Typography>
                    )}
            </form>
        </Paper>
    );
}

export default Login_register;
