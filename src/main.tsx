import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import {
  Login,
  Register,
  UserProvider,
  Chat,
} from "./components";

import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:4000');

const App = () => {
  const user = localStorage.getItem("user");
  console.log(user);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={user ? <Chat socket={socket} selectedUser={null}/> : <Navigate to="/" />} />
    </Routes>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found in the DOM.");
}
