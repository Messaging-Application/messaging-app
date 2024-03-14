import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import {
  Login,
  Register,
  UserProvider,
  Chat,
} from "./components";


const App = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && !socket) {
      const userJson = JSON.parse(user);
      console.log(userJson.id);
      const newSocket = new WebSocket('wss://2ezs7zsjrl.execute-api.eu-central-1.amazonaws.com/production?userId=' + userJson.id);
      setSocket(newSocket);
    }
  }, [socket]);

  if (socket === null) {
    navigate("/", { replace: true });
  }


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {socket !== null && (
        <Route path="/chat" element={<Chat socket={socket} selectedUser={null} />} />
      )}
    </Routes>
  );
};


const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
  );
} else {
  console.error("Root element with ID 'root' not found in the DOM.");
}
