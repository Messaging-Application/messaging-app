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

  useEffect(() => {
    socket.on('messageResponse', (data: MessageData) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <UsersList setShowProfile={setShowProfile} setSelectedUser={setSelectedUser}/> 
      <div className="chat__main">
      <ChatHeader setShowProfile={setShowProfile} selectedUser={selectedUser}/> 
        {!showProfile && (
          <>
            <ChatBody messages={messages} lastMessageRef={lastMessageRef}/>
            <ChatFooter socket={socket} selectedUser={selectedUser}/>
          </>
        )}
        {showProfile && <Profile />}
      </div>
    </div>
  );
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ setShowProfile, selectedUser }) => {
  const { setUser } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  const handleLeaveChat = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      await axios.post('http://localhost:8080/auth/logout', {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'credentials': 'include'
        }
      });
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      setUser(null);
      navigate('/');
      window.location.reload();
    } catch (error: any) {
      console.error('Error:', error);
    } };

  return (
    <>
      <header className="chat__mainHeader">
        <p>{selectedUser?.username} ({selectedUser?.firstName} {selectedUser?.lastName})</p>
        <button style={{float:"right", marginRight:"10px"}} className="leaveChat__btn" onClick={() => setShowProfile(true)}>
          Profile
        </button>
        <button style={{float:"right", marginRight:"10px"}} className="leaveChat__btn" onClick={handleLeaveChat}>
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
        <div className="message__container">
          {messages.map((message: MessageData) =>
            message.senderId === userJson?.id ? (
              <div className="message__chats" key={message.messageId}>
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.messageContent}</p>
                </div>
              </div>
            ) : (
              <div className="message__chats" key={message.messageId}>
                <p>{message.senderId}</p>
                <div className="message__recipient">
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
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('username')) {
      socket.emit('message', {
        messageContent: message,
        senderId: user?.id,
        receiverId: selectedUser?.id,
        timestamp: Date.now(),
        messageId: `${socket.id}${Math.random()}`,
      });
    }
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default Chat;