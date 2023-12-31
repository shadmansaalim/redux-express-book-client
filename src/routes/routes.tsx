import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AllBooks from "../pages/AllBooks";
import AddNewBook from "../pages/AddNewBook";
import BookDetails from "../pages/BookDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/all-books",
    element: <AllBooks />,
  },
  {
    path: "/add-new-book",
    element: <AddNewBook />,
  },
  {
    path: "/book/:id",
    element: <BookDetails />,
  },
]);

export default routes;
