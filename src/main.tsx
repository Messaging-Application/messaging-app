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
  Chat,
  // UserContext,
} from "./components";
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:4000');

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
    element: <Profile/>,
  },
  {
    path: "/chat",
    element: <Chat socket={socket}/>,
  },
  
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found in the DOM.");
}