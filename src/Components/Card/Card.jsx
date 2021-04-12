import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Edit from "../Edit";
import Delete from "../Delete";
import "../../App.css";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    maxHeight: 80,
  },
  media: {
    height: 0,
    paddingTop: "50%",
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Card1(props) {
  console.log(props);
  const options = [
    <Edit
      fname={props.fname}
      lname={props.lname}
      contact={props.contact}
      imageUrl={props.imageUrl}
    />,
    <Delete contact={props.contact} />,
  ];
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ marginLeft: "18px" }}>
      <div style={{ padding: "14px", float: "left" }}>
        <Card
          className={classes.root}
          style={{
            paddingTop: "0px",
            paddingBottom: "11px",
            width: "416px",
            boxShadow: "3px 3px 3px 3px lightgrey",
            backgroundColor: "#d2e1e9",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                style={{ width: "60px", height: "60px" }}
                className={classes.avatar}
                src={props.imageUrl}
              />
            }
            action={
              <div>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "25ch",
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem onClick={handleClose}>{option}</MenuItem>
                  ))}
                </Menu>
              </div>
            }
            title={props.fname + " " + props.lname}
            subheader={props.contact}
          />
        </Card>
      </div>
    </div>
  );
}
