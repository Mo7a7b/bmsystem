/* eslint-disable react-hooks/exhaustive-deps */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useContext, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppbarContext } from "../App";
export default function Appbar() {
  let { status, setStatus } = useContext(AppbarContext);

  if (status === "Logout") {
    var user = JSON.parse(localStorage.getItem("user"));
    var username = user.username;
  }
  var handleChangeStatus = () => {
    if (status === "Login") {
      setStatus("Register");
    } else if (status === "Register") {
      setStatus("Login");
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      setStatus("Logout");
    } else {
      setStatus("Register");
    }
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, visibility: "hidden" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant={"body2"}
            component="div"
            sx={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <div style={{ fontSize: "12px", fontWeight: 900 }}>
              Book Management System
            </div>

            {status === "Logout" ? (
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <img
                  style={{ width: "40px", borderRadius: "50%" }}
                  src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  alt=""
                />
                <div style={{ fontWeight: 600, textTransform: "capitalize" }}>
                  {username}
                </div>
              </div>
            ) : (
              ""
            )}
          </Typography>
          {status !== "Logout" ? (
            <Button onClick={handleChangeStatus} color="inherit">
              {status}
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
