/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import Button from "@mui/material/Button";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";

const AddBook = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [open, setOpen] = useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  function where(e) {
    if (e === "Show Books") {
      location.href = "/allBooks";
    } else if (e === "Home") {
      location.href = "/";
    } else if (e === "Statistics") {
      location.href = "/statistics";
    } else {
      console.log("errr");
    }
  }
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home", "Show Books", "Statistics"].map((text, index) => (
          <ListItem
            onClick={(e) => where(e.target.outerText)}
            key={text}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon onClick={() => where(text)}>
                {index === 0 ? <HomeIcon onClick={() => where("Home")} /> : ""}
                {index === 1 ? (
                  <CollectionsBookmarkIcon
                    onClick={() => where("Show Books")}
                  />
                ) : (
                  ""
                )}
                {index === 2 ? (
                  <BarChartIcon onClick={() => where("Statistics")} />
                ) : (
                  ""
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  let [color, setColor] = useState("success");
  let [msg, setMsg] = useState("");
  let [showAlert, setShowAlert] = useState(false);
  let [BackdropOpen, setBackdropOpen] = useState(false);
  let [title, setTitle] = useState("");
  let [details, setdetails] = useState("");
  let [author, setauthor] = useState("");
  let [category, setcategory] = useState("");
  let [url, seturl] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  let handleAddBook = () => {
    if (
      title === "" ||
      details === "" ||
      category === "" ||
      url === "" ||
      author === ""
    ) {
      setShowAlert(true);
      setMsg("You must fill out the empty fields");
      setColor("error");
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    } else {
      let token = localStorage.getItem("token");
      setOpen(false);
      setBackdropOpen(true);
      axios
        .post(
          "https://bookmangementsystem.onrender.com/addBook",
          {
            book: {
              title: title,
              details: details,
              author: author,
              progress: 0,
              category: category,
              url: url,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setBackdropOpen(false);
          setShowAlert(true);
          setMsg(response.data.message);
          setColor("success");
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
          let user = JSON.parse(localStorage.getItem("user"));
          let newUser = {
            id: user.id,
            username: user.username,
            password: user.password,
            books: response.data.books,
          };
          localStorage.setItem("user", JSON.stringify(newUser));
        })
        .then(() => {
          location.href = "/allBooks";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  let [authen, setAuth] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  let handleAdd = () => {
    setOpen(true);
  };
  return (
    <div>
      {authen ? (
        <div
          style={{
            width: "100%",
            height: "70vh",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            color: "#333",
            flexDirection: "column",
          }}
        >
          <div style={{ marginTop: "20px" }}>
            {["TO MANAGEMENT SYSTEM"].map((anchor) => (
              <Fragment key={anchor}>
                <Button
                  variant="contained"
                  onClick={toggleDrawer("right", true)}
                >
                  {anchor}
                </Button>
                <SwipeableDrawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                  onOpen={toggleDrawer("right", true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </Fragment>
            ))}
          </div>
          <h1 style={{ color: "#fff", marginBottom: "150px" }}>Add a Book</h1>
          <IconButton onClick={handleAdd} sx={{ scale: "13", padding: 0 }}>
            <AddCircleOutlineIcon sx={{ color: "#fff" }} />
          </IconButton>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Book</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Details"
                type="text"
                fullWidth
                variant="standard"
                value={details}
                onChange={(e) => setdetails(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Author"
                type="text"
                fullWidth
                variant="standard"
                value={author}
                onChange={(e) => setauthor(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Category"
                type="text"
                fullWidth
                variant="standard"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Image URL"
                type="url"
                fullWidth
                variant="standard"
                value={url}
                onChange={(e) => seturl(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAddBook}>Add</Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#333",
          }}
        >
          <h1 style={{ color: "white" }}>
            You Aren't Logged into Your Account
          </h1>
        </div>
      )}
      <Alert
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          margin: 3,
          display: showAlert ? "flex" : "none",
          zIndex: 99999,
        }}
        severity={color}
      >
        {msg}
      </Alert>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={BackdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default AddBook;
