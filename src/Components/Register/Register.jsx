import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import fire from "firebase";
import { NavLink } from "react-router-dom";

const progressStyle = {
  position: "absolute",
  top: "0",
  right: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [progress, setProgress] = useState(false);
  const handleSingup = () => {
    if (password !== cpassword) {
      alert(" Password not match");
      return;
    } else {
      setProgress(true);
      clearError();
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message);
              break;
            case "auth/weak-password":
              setPasswordError(err.message);
              break;
            default:
          }
        });
      <NavLink to="/Login" />;
    }
  };

  const clearError = () => {
    setEmailError("");
    setPasswordError("");
  };

  const classes = useStyles();
  if (progress) {
    return (
      <div style={progressStyle}>
        <CircularProgress thickness={5} />
      </div>
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            value={email}
            label="Username"
            onChange={(event) => setEmail(event.target.value)}
          />
          <p>{emailError}</p>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <p>{passwordError}</p>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Confirm Password"
            value={cpassword}
            onChange={(event) => setCPassword(event.target.value)}
          />
          <>
            <Button
              onClick={handleSingup}
              id="btn1"
              color="primary"
              variant="contained"
            >
              Sign up
            </Button>
            <> Have an account</>
            <Button>
              <NavLink to="/Login">
                <b>Sign In</b>
              </NavLink>
            </Button>
          </>
        </form>
      </div>
    </Container>
  );
};

export default Register;
