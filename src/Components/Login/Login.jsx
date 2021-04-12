import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import fire from "firebase";
import { NavLink } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "../../Components/Dashboard/dash.css";
import { CircularProgress } from "@material-ui/core";

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

const Login = () => {
  const history = useHistory();
  const [progress, setProgress] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleLogin = () => {
    setProgress(true);
    clearError();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };
  React.useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        history.push("/");
      }
    });
  }, [history]);
  const clearError = () => {
    setEmailError("");
    setPasswordError("");
  };
  const clearInput = () => {
    setEmail("");
    setPassword("");
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
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
          <>
            <Button
              onClick={handleLogin}
              id="btn1"
              color="primary"
              variant="contained"
            >
              Sign in
            </Button>
            <>Don,t have an account </>
            <NavLink to="/Register">
              <b>SIGN UP</b>
            </NavLink>
          </>
        </form>
      </div>
    </Container>
  );
};

export default Login;
