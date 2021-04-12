import React from "react";
import fire from "firebase";
import Dashboard from "../Components/Dashboard";
import { Redirect } from "react-router-dom";
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
export default function PrivateRoute() {
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [progress, setProgress] = React.useState(true);

  React.useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoginStatus(true);
      }
      setProgress(false);
    });
  }, []);

  return progress ? (
    <div style={progressStyle}>
      <CircularProgress thickness={5} />
    </div>
  ) : loginStatus ? (
    <Dashboard />
  ) : (
    <Redirect to="/Login" />
  );
}
