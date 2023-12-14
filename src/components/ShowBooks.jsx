/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import DialogContentText from "@mui/material/DialogContentText";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import HomeIcon from "@mui/icons-material/Home";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMemo } from "react";
import { useRef } from "react";
const ShowBooks = () => {
  let bodyRef = useRef(null);
  let [title, setTitle] = useState("");
  let [auth, setauth] = useState(false);
  let [prog, setProg] = useState(0);
  let [index, setIndex] = useState(null);
  let [details, setdetails] = useState("");
  let [BackdropOpen, setBackdropOpen] = useState(false);
  let [color, setColor] = useState("success");
  let [msg, setMsg] = useState("");
  let [showAlert, setShowAlert] = useState(false);
  let [author, setauthor] = useState("");
  let [category, setcategory] = useState("");
  let [url, seturl] = useState("");
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  useEffect(() => {
    if (prog > 100) {
      setProg(100);
    } else if (prog < 0) {
      setProg(0);
    }
  }, [prog]);
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
    } else if (e === "Statistics") {
      location.href = "/bmsystem/statistics";
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
        {["Home", "Add Book", "Statistics"].map((text, index) => (
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
  const handleClose = () => {
    setOpen(false);
  };
  let [categories, setCategories] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  let [opendel, setopendel] = useState(false);
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
    if (auth) {
      let newcates = new Set(categories);
      let newArray = Array.from(newcates);
      setCategories(newArray);
    }
  }, [auth, categories]);
  if (auth && books) {
    var BooksJsx = books.map((b, i) => {
      return (
        <AnimatePresence key={i}>
          <motion.div
            className="book"
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            layout
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            key={i}
          >
            <div>
              <CircularProgress
                sx={{
                  ".MuiCircularProgress-svg": {
                    position: "relative",
                    right: "9px",
                    bottom: "220%",
                  },
                }}
                variant="determinate"
                value={b.progress}
              />
              <p
                style={{
                  margin: 0,
                  position: "relative",
                  top: "-22px",
                  fontSize: "11px",
                  right: "105%",
                }}
              >
                {b.progress}%
              </p>
              <div style={{ position: "relative", top: "-40px", left: "80px" }}>
                <button
                  onClick={() => handleOpenModel(i)}
                  style={{ background: "rgb(19, 19, 204)" }}
                  id="bookbtn"
                  className="editb"
                >
                  <EditNoteIcon />
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="delb"
                  id="bookbtn"
                >
                  <DeleteForeverOutlinedIcon />
                </button>
              </div>
            </div>
            <img src={b.url} alt={b.title} />
            <h2>{b.title}</h2>
            <h6>{b.details}</h6>
            <h6>{b.author}</h6>
          </motion.div>
        </AnimatePresence>
      );
    });
  }

  function handleOpenModel(index) {
    setOpen(true);
    let user = JSON.parse(localStorage.getItem("user"));
    let book = user.books[index];
    setTitle(book.title);
    setdetails(book.details);
    setauthor(book.author);
    setcategory(book.category);
    seturl(book.url);
    setProg(book.progress);
    setIndex(index);
  }

  let handleDeleteClose = () => {
    setopendel(false);
  };

  function handleDelete(index) {
    setopendel(true);
    setIndex(index);
  }
  let handleDeleteBook = () => {
    let theIndex = index;
    let token = localStorage.getItem("token");
    setopendel(false);
    setBackdropOpen(true);
    axios
      .delete(
        `https://bookmangementsystem.onrender.com/deleteBook/${theIndex}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setBackdropOpen(false);
        setShowAlert(true);
        setMsg(res.data.message);
        setColor("success");
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        let user = JSON.parse(localStorage.getItem("user"));
        let newUser = {
          id: user.id,
          username: user.username,
          password: user.password,
          books: res.data.books,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        setkk(null);
        let set = new Set(categories);
        let newArr = Array.from(set);
        newArr.map((c) => {
          if (!categories.includes(c)) {
            let sset = new Set(categories);
            let nsewArr = Array.from(sset);
            setCategoriesJsx(
              nsewArr.map((c) => {
                return (
                  <div key={c}>
                    <button
                      onClick={(e) => handleFilter(e.target.innerHTML)}
                      className="catebtn"
                    >
                      {c}
                    </button>
                  </div>
                );
              })
            );
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function handleUpdate() {
    let theIndex = index;
    let token = localStorage.getItem("token");
    setOpen(false);
    setBackdropOpen(true);
    axios
      .put(
        `https://bookmangementsystem.onrender.com/updateBook/${theIndex}`,
        {
          updatedBook: {
            title: title,
            details: details,
            author: author,
            progress: prog,
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
      .then((result) => {
        setBackdropOpen(false);
        setShowAlert(true);
        setMsg(result.data.message);
        setColor("success");
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        let user = JSON.parse(localStorage.getItem("user"));
        let newUser = {
          id: user.id,
          username: user.username,
          password: user.password,
          books: result.data.books,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        setkk(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  let [kk, setkk] = useState(null);
  function handleOpenModel2(t) {
    books.map((b, index) => {
      if (b.title === t) {
        setOpen(true);
        let user = JSON.parse(localStorage.getItem("user"));
        let book = user.books[index];
        setTitle(book.title);
        setdetails(book.details);
        setauthor(book.author);
        setcategory(book.category);
        seturl(book.url);
        setProg(book.progress);
        setIndex(index);
      }
    });
  }
  function handleDelete2(t) {
    books.map((b, index) => {
      if (b.title === t) {
        setopendel(true);
        setIndex(index);
      }
    });
  }
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    if (auth) {
      books.filter((b) => {
        return (
          b.category ===
          categories.map((cc) => {
            let cate = categories.filter((c) => c === cc);
            localStorage.setItem(cc, cate.length);
          })
        );
      });
    }
  }, [auth]);
  function handleFilter(value) {
    let filtered_books = books.filter((b) => {
      return b.category === value;
    });
    localStorage.setItem(value, filtered_books.length);
    let filteredJSX = filtered_books.map((b, i) => {
      return (
        <AnimatePresence key={i}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="book"
            key={i}
          >
            <div>
              <CircularProgress
                sx={{
                  ".MuiCircularProgress-svg": {
                    position: "relative",
                    right: "9px",
                    bottom: "220%",
                  },
                }}
                variant="determinate"
                value={b.progress}
              />
              <p
                style={{
                  margin: 0,
                  position: "relative",
                  top: "-22px",
                  fontSize: "11px",
                  right: "105%",
                }}
              >
                {b.progress}%
              </p>
              <div style={{ position: "relative", top: "-40px", left: "80px" }}>
                <button
                  onClick={() => handleOpenModel2(b.title)}
                  style={{ background: "rgb(19, 19, 204)" }}
                  id="bookbtn"
                  className="editb"
                >
                  <EditNoteIcon />
                </button>
                <button
                  onClick={() => handleDelete2(b.title)}
                  className="delb"
                  id="bookbtn"
                >
                  <DeleteForeverOutlinedIcon />
                </button>
              </div>
            </div>
            <img src={b.url} alt={b.title} />
            <h2>{b.title}</h2>
            <h6>{b.details}</h6>
            <h6>{b.author}</h6>
          </motion.div>
        </AnimatePresence>
      );
    });
    setkk(filteredJSX);
  }
  let [categoriesJsx, setCategoriesJsx] = useState(
    categories.map((c) => {
      return (
        <div key={c}>
          <button
            onClick={(e) => handleFilter(e.target.innerHTML)}
            className="catebtn"
          >
            {c}
          </button>
        </div>
      );
    })
  );

  useEffect(() => {
    let set = new Set(categories);
    let newArr = Array.from(set);

    if (auth) {
      newArr.map((c) => {
        if (!categories.includes(c)) {
          let sset = new Set(categories);
          let nsewArr = Array.from(sset);
          setCategoriesJsx(
            nsewArr.map((c) => {
              return (
                <div key={c}>
                  <button
                    onClick={(e) => handleFilter(e.target.innerHTML)}
                    className="catebtn"
                  >
                    {c}
                  </button>
                </div>
              );
            })
          );
        }
      });

      setCategoriesJsx(
        newArr.map((c) => {
          return (
            <div key={c}>
              <button
                onClick={(e) => handleFilter(e.target.innerHTML)}
                className="catebtn"
              >
                {c}
              </button>
            </div>
          );
        })
      );
    }
  }, [auth, categories]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      setauth(false);
    } else {
      setauth(true);
    }
  }, []);
  let handleFilterByAll = () => {
    setkk(null);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginTop: 65,
        marginLeft: 15,
      }}
    >
      {auth ? (
        books.length === 0 ? (
          <>
            <div
              style={{
                marginTop: "20px",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: "70px",
                zIndex: 10,
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
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                bottom: "70px",
                fontSize: "30px",
                right: "15px",
              }}
            >
              You don't have any books
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                marginTop: "20px",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: "70px",
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
                width: "100%",
                justifyContent: "center",
                gap: 15,
                margin: "inherit",
                alignItems: "center",
                position: "relative",
                right: "20px",
                flexWrap: "wrap",
              }}
            >
              <button onClick={handleFilterByAll} className="catebtn">
                All
              </button>
              {categoriesJsx}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                flexWrap: "wrap",
                alignItems: "center",
                width: "100%",
                position: "relative",
                right: "10px",
                justifyContent: "space-around",
              }}
              ref={bodyRef}
            >
              {kk ? kk : BooksJsx}
            </div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Update Book</DialogTitle>
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
                  label="Progress"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={prog}
                  maxLength={100}
                  inputProps={{ maxLength: 100 }}
                  onChange={(e) => setProg(e.target.value)}
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
                <Button onClick={handleUpdate} id="update">
                  Update
                </Button>
              </DialogActions>
            </Dialog>
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
              open={BackdropOpen}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog open={opendel} onClose={handleDeleteClose}>
              <DialogTitle>Delete Book</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You can't restore data after deletation (Are you sure you want
                  to delete)?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteClose}>Cancel</Button>
                <Button color="error" onClick={handleDeleteBook}>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "100px",
          }}
        >
          <h1 color="#fff">You Are't Logged Into Your Account</h1>
        </div>
      )}
    </div>
  );
};

export default ShowBooks;
