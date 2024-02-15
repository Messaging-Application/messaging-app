import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  Login,
  Register
} from "./components";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/profile",
    element: <p>profile</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);