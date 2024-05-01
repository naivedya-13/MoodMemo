import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Mainyt from "./Mainyt";
import Posts from "./emoji";
import Navbaar from "./Navbaar";
import Body from "./Body";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Form = () => {
  // function showElement(element) {
  //     element.style.display = "flex"
  // }

  // function hideElement(element) {
  //     element.style.display = "none"
  // }

  return (
    <>
      <Navbaar />
      <ToastContainer position="top-right" theme="dark" />
      <Outlet />
      <Footer />
    </>
  );
};

const createapp = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
    errorElement: <h1>not anything</h1>,
    children: [
      {
        path: "/",
        element: <Body />,
        errorElement: <h1>child error</h1>,
      },
      {
        path: "/mainyt",
        element: <Mainyt />,
        errorElement: <h1>not anything</h1>,
      },
    ],
  },
]);

const rootApp = ReactDOM.createRoot(document.getElementById("root"));

rootApp.render(<RouterProvider router={createapp}></RouterProvider>);
