import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import fire from "firebase";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Pagination from "../../Components/Pagination";
import SearchBar1 from "../../Components/SearchBar";

import RecentActorsRoundedIcon from "@material-ui/icons/RecentActorsRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then((res) => {
        history.push("/Login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <RecentActorsRoundedIcon />
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            ></IconButton>

            <Typography variant="h6" className={classes.title}>
              Contact Manager
            </Typography>
            <ExitToAppIcon />
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <br></br>
      <SearchBar1 />
      <Pagination />
    </div>
  );
}
