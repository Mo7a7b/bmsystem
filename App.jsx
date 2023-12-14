import Appbar from "./components/Appbar";
import Book from "./components/Book";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddBook from "./components/AddBook";
import ShowBooks from "./components/ShowBooks";
import Statistics from "./components/Statistics";
import Error from "./components/Error";
const router = createBrowserRouter([
  {
    path: "/bmsystem",
    element: <Book />,
  },
  {
    path: "/bmsystem/add",
    element: <AddBook />,
  },
  {
    path: "/bmsystem/allBooks",
    element: <ShowBooks />,
  },
  {
    path: "/bmsystem/statistics",
    element: <Statistics />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);
export let AppbarContext = createContext({});
export let ErrorContext = createContext({});
function App() {
  let [status, setStatus] = useState("Register");
  let [error, setError] = useState(false);
  useEffect(() => {
    if (error) {
      document.body.style.cssText = "background-image:none !important";
    } else {
      document.body.style.cssText = "background:#23252A !important";
    }
  }, [error]);
  return (
    <AppbarContext.Provider value={{ status, setStatus }}>
      <ErrorContext.Provider value={{ error, setError }}>
        <Appbar />
        <RouterProvider router={router}></RouterProvider>
      </ErrorContext.Provider>
    </AppbarContext.Provider>
  );
}

export default App;
