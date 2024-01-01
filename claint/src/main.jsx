// import React, { useState, useEffect } from 'react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Layot from './comps/Layot';
import './index.css';
import About from './comps/About';
import Info from './comps/Info';
import Home from './comps/Home';
import SearchGmachim from './comps/SearchGmachim';
import Brokerage from './comps/Brokerage';
import AddAd from "./comps/AddAd";
import Contact from "./comps/Contact";
import Login from "./comps/Login";
import Donation from "./comps/Donation";
import SignUp from './comps/SignUp';
import AdvertisingSuccess from './comps/AdvertisingSuccess';
import RegistrationgSuccess from './comps/RegistrationSuccess';
import Disconnection from './comps/Disconnection';
import Register from './comps/Register';
import UpdatePassword from './comps/UpdatePassword';
import User from './comps/User';
import Thanks from './comps/Thanks';
import EditPost from './comps/EditPost';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layot  />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "gmachim",
        element: <SearchGmachim />,
      },
      {
        path: "brokerage",
        element: <Brokerage />,
      },
      {
        path: "add",
        element: <AddAd />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "donation",
        element: <Donation />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "advertisingSuccess",
        element: <AdvertisingSuccess />,
      },
      {
        path: "registrationgSuccess",
        element: <RegistrationgSuccess />,
      },
      {
        path: "disconnection",
        element: <Disconnection  />,
      },
      {
        path: "register",
        element: <Register  />,
      },
      {
        path: "updatePassword",
        element: <UpdatePassword  />,
      },
      {
        path: "user",
        element: <User  />,
      },
      {
        path: "thanks",
        element: <Thanks  />,
      },
      {
        path: "editPost/:postId",
        element: <EditPost  />,
      },

    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);











