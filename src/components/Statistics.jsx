/* eslint-disable no-restricted-globals */
import { useState, useMemo, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { Fragment } from "react";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
const Statistics = () => {
  let [auth, setauth] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      setauth(false);
    } else {
      setauth(true);
    }
  }, []);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
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
    if (e === "Add Book") {
      location.href = "/bmsystem/add";
    } else if (e === "Home") {
      location.href = "/bmsystem";
    } else if (e === "Show Books") {
      location.href = "/bmsystem/allBooks";
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
        {["Home", "Add Book", "Show Books"].map((text, index) => (
          <ListItem
            onClick={(e) => where(e.target.outerText)}
            key={text}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon onClick={() => where(text)}>
                {index === 0 ? <HomeIcon onClick={() => where("Home")} /> : ""}
                {index === 1 ? (
                  <AddCircleIcon onClick={() => where("Add Book")} />
                ) : (
                  ""
                )}
                {index === 2 ? (
                  <CollectionsBookmarkIcon
                    onClick={() => where("Show Books")}
                  />
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
  let [categories, setCategories] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    var books = user.books;
  }
  useMemo(() => {
    if (auth) {
      books.map((b) => {
        setCategories((c) => [...c, b.category]);
      });
    }
  }, [auth]);
  useEffect(() => {
    let newcates = new Set(categories);
    let newArray = Array.from(newcates);
    setCategories(newArray);
  }, []);

  let lengths = useMemo(() => {
    let set = new Set(categories);
    let newArr = Array.from(set);
    return newArr.map((c) => {
      return Array.from(localStorage.getItem(c));
    });
  }, [categories]);

  let [userData, setUserdata] = useState({
    labels: [],
    datasets: [
      {
        label: "Number Of Books",
        data: [],
      },
    ],
  });
  setTimeout(() => {
    let set = new Set(categories);
    let newArr = Array.from(set);
    setUserdata({
      labels: newArr,
      datasets: [
        {
          label: "Number Of Books",
          data: lengths.map((l) => l[0]),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#h0af95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, 100);

  return (
    <>
      {auth ? (
        <>
          <div
            style={{
              marginTop: "20px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "70px",
              zIndex: 10,
              margin: "20px 0",
            }}
          >
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "50px",
            }}
          >
            <div
              className="charts"
              id="fch"
              style={{
                backgroundColor: "white",
                color: "black",
                width: 400,
                margin: 50,
                borderRadius: "10px",
                padding: 20,
              }}
            >
              <Bar data={userData} />
            </div>
            <div
              className="charts"
              style={{
                backgroundColor: "white",
                color: "black",
                width: 400,
                margin: 50,
                borderRadius: "10px",
                padding: 20,
              }}
            >
              <Line data={userData} />
            </div>
            <div
              className="charts"
              style={{
                backgroundColor: "white",
                color: "black",
                width: 400,
                margin: 50,
                borderRadius: "10px",
                padding: 20,
              }}
            >
              <Pie data={userData} />
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <h1>You are not Logged into your account</h1>
        </div>
      )}
    </>
  );
};

export default Statistics;
