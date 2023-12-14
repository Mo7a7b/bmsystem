/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState, useContext } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { Paper } from "@mui/material";
import axios from "axios";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { AppbarContext, ErrorContext } from "../App";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Book = () => {
  let { error, setError } = useContext(ErrorContext);
  let [logout, setLogout] = useState(false);
  let { status, setStatus } = useContext(AppbarContext);
  let [showLogout, setShowLogout] = useState(false);
  let [username1, setusername1] = useState("");
  let [password1, setpassword1] = useState("");
  let [username2, setusername2] = useState("");
  let [password2, setpassword2] = useState("");
  let [color, setColor] = useState("success");
  let [msg, setMsg] = useState("");
  let [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  function where(e) {
    if (e === "Add Book") {
      location.href = "/add";
    } else if (e === "Show Books") {
      location.href = "/allBooks";
    } else if (e === "Statistics") {
      location.href = "/statistics";
    } else {
      console.log("errr");
    }
  }
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Add Book", "Show Books", "Statistics"].map((text, index) => (
          <ListItem
            onClick={(e) => where(e.target.outerText)}
            key={text}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon onClick={() => where(text)}>
                {index === 0 ? (
                  <AddCircleIcon onClick={() => where("Add Book")} />
                ) : (
                  ""
                )}
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
  let handleRegister = () => {
    if (password1 === "" || username1 === "") {
      setShowAlert(true);
      setMsg("You must fill out the fields");
      setColor("error");
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }
    setOpen(true);
    axios
      .post("https://bookmangementsystem.onrender.com/register", {
        username: username1,
        password: password1,
      })
      .then((response) => {
        setOpen(false);
        let message = response.data.message;
        if (
          message === "User already Exsits" ||
          message === "Password must be atleast 8 characters"
        ) {
          setColor("error");
        }
        setShowAlert(true);
        setMsg(message);
        setColor("success");
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setpassword1("");
        setusername1("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let handleLogin = () => {
    if (password2 === "" || username2 === "") {
      setShowAlert(true);
      setMsg("You must fill out the fields");
      setColor("error");
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }
    setOpen(true);
    axios
      .post("https://bookmangementsystem.onrender.com/login", {
        username: username2,
        password: password2,
      })
      .then((response) => {
        setOpen(false);
        let message = response.data.message;
        if (message === "Invalid Credentials") {
          setColor("error");
        }
        setShowAlert(true);
        setMsg(message);
        setColor("success");
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setpassword2("");
        setusername2("");
        if (response.data.token !== undefined) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowLogout(false);
    setLogout(true);
    setStatus("Register");
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      setShowLogout(false);
    } else {
      setShowLogout(true);
      setStatus("Logout");
    }
  }, [handleLogin, handleLogout]);
  return (
    <div
      id="maind"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        style={{ fontSize: "30px", margin: "100px 0" }}
        fontWeight={600}
      >
        WELCOME TO YOUR BOOK MANAGEMENT SYSTEM
        <EmojiEmotionsIcon
          className="emoji"
          sx={{ color: "#FDB40B", marginLeft: 1, fontSize: "50px" }}
        />
      </Typography>
      {showLogout ? (
        <>
          <Button onClick={handleLogout} color="error" variant="contained">
            Log Out
          </Button>
          <div style={{ marginTop: "20px" }}>
            {["TO MANAGEMENT SYSTEM"].map((anchor) => (
              <React.Fragment key={anchor}>
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
              </React.Fragment>
            ))}
          </div>
        </>
      ) : (
        <>
          {status === "Login" ? (
            <>
              <h4 color="white !importsnt">Register</h4>
              <TextField
                sx={{ width: "25ch", color: "#fff" }}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={username1}
                onChange={(e) => setusername1(e.target.value)}
              />

              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel
                  sx={{ color: "#fff" }}
                  htmlFor="outlined-adornment-password"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password1}
                  sx={{ color: "#fff" }}
                  onChange={(e) => setpassword1(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#fff" }} />
                        ) : (
                          <Visibility sx={{ color: "#fff" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox />}
                label="Accept all Privacy and Policy"
                sx={{ fontSize: "10px" }}
              />
              <Button
                sx={{ marginTop: 2 }}
                disabled={username1 === "" || password1 === "" ? true : false}
                onClick={handleRegister}
                variant="contained"
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <h4>Login</h4>
              <TextField
                sx={{ width: "25ch" }}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={username2}
                onChange={(e) => setusername2(e.target.value)}
              />
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel
                  sx={{ color: "#fff" }}
                  htmlFor="outlined-adornment-password"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  sx={{ color: "#fff" }}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password2}
                  onChange={(e) => setpassword2(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#fff" }} />
                        ) : (
                          <Visibility sx={{ color: "#fff" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox />}
                label="Accept all Privacy and Policy"
                sx={{ fontSize: "10px" }}
              />
              <Button
                disabled={username2 === "" || password2 === "" ? true : false}
                sx={{ marginTop: 2 }}
                onClick={handleLogin}
                variant="contained"
              >
                Log In
              </Button>
            </>
          )}
        </>
      )}

      <Alert
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          margin: 3,
          display: showAlert ? "flex" : "none",
        }}
        severity={color}
      >
        {msg}
      </Alert>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Book;
