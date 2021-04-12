import AddUser from "../../Components/AddUser";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import SortRoundedIcon from "@material-ui/icons/SortRounded";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/action";
import Card2 from "../../Components/Card2";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function SearchBar1() {
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  function ascending() {
    state.users.sort(function (a, b) {
      if (a.name.fname.toLowerCase() < b.name.fname.toLowerCase()) {
        return -1;
      }
      if (a.name.fname.toLowerCase() > b.name.fname.toLowerCase()) {
        return 1;
      }
      if (a.name.lname.toLowerCase() < b.name.lname.toLowerCase()) {
        return -1;
      }
      if (a.name.lname.toLowerCase() > b.name.lname.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    dispatch(fetchUsers(state.users));
    handleClose();
  }
  function descending() {
    state.users.sort(function (a, b) {
      if (a.name.fname.toLowerCase() > b.name.fname.toLowerCase()) {
        return -1;
      }
      if (a.name.fname.toLowerCase() < b.name.fname.toLowerCase()) {
        return 1;
      }
      if (a.name.lname.toLowerCase() > b.name.lname.toLowerCase()) {
        return -1;
      }
      if (a.name.lname.toLowerCase() < b.name.lname.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    handleClose();
    dispatch(fetchUsers(state.users));
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Grid container spacing={0}>
        <>
          <Grid item xs={2} sm={2}>
            <AddUser />
          </Grid>
        </>
        <Grid item xs={8} sm={8}>
          <TextField
            variant="outlined"
            fullWidth
            type="text"
            label="Search"
            placeholder="Search..."
            onChange={(event) => setSearch(event.target.value)}
          />
        </Grid>
        <Grid item xs={1} sm={1}>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
            className="sort"
          >
            Sort
            <SortRoundedIcon />
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={ascending}>
              <ListItemIcon>
                <>A-Z</>
              </ListItemIcon>
            </StyledMenuItem>
            <StyledMenuItem onClick={descending}>
              <ListItemIcon>
                <>Z-A</>
              </ListItemIcon>
            </StyledMenuItem>
          </StyledMenu>
        </Grid>
      </Grid>
      <br></br>
      <br></br>

      <Card2 search={search} />
    </div>
  );
}
