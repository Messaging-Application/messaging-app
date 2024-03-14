import '../index.css'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersList, Profile, UserContext } from './';
import {
  ChatProps,
  UserData,
  MessageData, 
  ChatBodyProps,
  ChatHeaderProps,
  UserContextType,
} from "../types";
import axios from 'axios';

const Chat: React.FC<ChatProps> = ({ socket }) => {
  const [showProfile, setShowProfile] = useState<boolean>(true);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null); 
  const [showUser, setShowUser] = useState<UserData | null>(null); 

  // Effect to listen for incoming messages from the socket
  useEffect(() => {
    socket.on('messageResponse', (data: MessageData) => setMessages(prevMessages => [...prevMessages, data]));
    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('messageResponse');
    };
  }, [socket]);

  // Effect to scroll to the last message when messages change
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Function to handle showing a user in the profile
  const handleShowUser = (user: UserData | null) => {
    setShowUser(user);
  };

  return (
    <div className="chat">
      <UsersList setShowProfile={setShowProfile} setSelectedUser={setSelectedUser} handleShowUser={handleShowUser}/> 
      <div className="chatMain">
        <ChatHeader setShowProfile={setShowProfile} selectedUser={selectedUser} handleShowUser={handleShowUser} setSelectedUser={setSelectedUser}/> 
        {!showProfile && (
          <>
            <ChatBody messages={messages} lastMessageRef={lastMessageRef}/>
            <ChatFooter socket={socket} selectedUser={selectedUser}/>
          </>
        )}
        {showProfile && <Profile key={showUser?.id} showUser={showUser}/>}
      </div>
    </div>
  );
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ setShowProfile, selectedUser, handleShowUser, setSelectedUser }) => {
  const { setUser } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  // Function to handle leaving the chat (logging out)
  const handleLeaveChat = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      // Logout request
      await axios.post('http://localhost:8080/auth/logout', {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'credentials': 'include'
        }
      });
      
      // Clear user data and navigate to login page
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      setUser(null);
      navigate('/');
      window.location.reload();
    } catch (error: any) {
      // Log any errors
      console.error('Error:', error.response.data.message);
    } };

  return (
    <>
      <header className="chatMainHeader">
        {selectedUser && (<p>{selectedUser?.username} ({selectedUser?.firstName} {selectedUser?.lastName})</p>) }
        <button style={{float:"right", marginRight:"10px"}} className="leaveChatButton" onClick={() => {setShowProfile(true); handleShowUser(null); setSelectedUser(null);}} aria-label="View Profile">
          Profile
        </button>
        <button style={{float:"right", marginRight:"10px"}} className="leaveChatButton" onClick={handleLeaveChat} aria-label="Logout">
          Logout
        </button>
      </header>

    </>
  );
};

const ChatBody: React.FC<ChatBodyProps> = ({ messages, lastMessageRef }) => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const userJson = JSON.parse(userString);
    return (
      <>
        <div className="messageContainer">
          {messages.map((message: MessageData) =>
            message.senderId === userJson?.id ? (
              <div className="messageChats" key={message.messageId}>
                <p className="senderName">You</p>
                <div className="messageSender">
                  <p>{message.messageContent}</p>
                </div>
              </div>
            ) : (
              <div className="messageChats" key={message.messageId}>
                <p>{message.senderId}</p>
                <div className="messageRecipient">
                  <p>{message.messageContent}</p>
                </div>
              </div>
            )
          )}
          <div ref={lastMessageRef} />
        </div>
      </>
    );
  }  
  return null;
};

const ChatFooter = ({ socket, selectedUser }: ChatProps) => {
  const [message, setMessage] = useState<string>('');
  // Get user data from local storage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  
  // Function to handle sending a message
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if message is not empty and user is logged in
    if (message.trim() && localStorage.getItem('username')) {
      // Emit message event to the socket
      socket.emit('message', {
        messageContent: message,
        senderId: user?.id,
        receiverId: selectedUser?.id,
        messageId: `${socket.id}${Math.random()}`,
      });
    }
    // Clear the message input
    setMessage('');
  };
  return (
    <div className="chatFooter">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-label="Type your message"
        />
        <button className="sendButton">SEND</button>
      </form>
    </div>
  );
};

export default Chat;