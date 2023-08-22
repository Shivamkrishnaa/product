import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import { Login } from './components/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  }
]);

export const App = () => {
  return (
    <RouterProvider router={router} />
  )
};