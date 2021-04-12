import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import "../../App.css";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function BasicPagination(users) {
  const classes = useStyles();
  const state = useSelector((state) => state);

  const totalusers = state.users.length;

  return (
    <>
      <span
        style={{
          position: "fixed",
          top: "95%",
          left: "10px",
          fontWeight: "bolder",
          color: "black",
        }}
      >
        Total= {totalusers}{" "}
      </span>
    </>
  );
}
