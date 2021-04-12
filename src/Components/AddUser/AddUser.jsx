import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { addUser } from "../../Users/user";
import { addUsers } from "../../redux/action";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import "../../App.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddUser() {
  const [open, setOpen] = React.useState(false);
  const [shouldUpload, setShouldUpload] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    fname: "",
    lname: "",
    contact: "",
  });

  const classes = useStyles();

  async function photoUpload() {
    await firebase.storage().ref(`image/${photo.name}`).put(photo);
    await firebase
      .storage()
      .ref(`image/${photo.name}`)
      .getDownloadURL()
      .then((res) => {
        setImageUrl(res);
      })
      .catch((err) => console.log(err));
  }
  if (shouldUpload) {
    photoUpload();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function eventHandler(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  function add() {
    addUser({ user, imageUrl });
    dispatch(addUsers({ ...user, imageUrl }));

    handleClose();
    clearInput();
  }
  function clearInput() {
    setUser({ fname: "", lname: "", contact: "" });
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        className="new"
      >
        New +
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar
                style={{
                  height: "100px",
                  width: "100px",
                }}
                src={imageUrl}
              ></Avatar>
              <input
                type="file"
                id="file"
                onChange={(event) => {
                  if (event.target.files[0]) {
                    setPhoto(event.target.files[0]);
                    setShouldUpload(true);
                  }
                }}
                name="file"
                class="inputfile"
              />
              <label for="file">Image</label>
              <br></br>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="fname"
                    variant="outlined"
                    required
                    fullWidth
                    id="fname"
                    value={user.fname}
                    onChange={eventHandler}
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    value={user.lname}
                    onChange={eventHandler}
                    name="lname"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="contact"
                    label="Phone Number"
                    value={user.contact}
                    onChange={eventHandler}
                    name="contact"
                    autoComplete="contact"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={add}
              >
                Save
              </Button>
              <Button color="primary" variant="contained" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
