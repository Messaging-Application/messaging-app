import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  Login,
  Register,
  UserProvider,
  Profile,
  // UserContext,
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
    path: "/chat",
    element: <Profile/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);