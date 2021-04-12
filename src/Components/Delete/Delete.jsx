import firebase from "firebase";
import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { deleteUsers } from "../../redux/action";
import { deleteUser } from "../../Users/user";

const Delete = ({ contact }) => {
  const dispatch = useDispatch();

  function delete1() {
    deleteUser({ contact });
    dispatch(deleteUsers({ contact }));
  }

  return (
    <>
      <Button onClick={delete1}>Delete</Button>
    </>
  );
};

export default Delete;
