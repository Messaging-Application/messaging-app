import '../index.css'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersList, Profile } from './';
import {
  ChatProps,
  MessageData, 
  ChatBodyProps,
  ChatHeaderProps,
} from "../types";

const Chat: React.FC<ChatProps> = ({ socket }) => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('messageResponse', (data: MessageData) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <UsersList setShowProfile={setShowProfile}/>
      <div className="chat__main">
      <ChatHeader setShowProfile={setShowProfile} />
        {!showProfile && (
          <>
            <ChatBody messages={messages} lastMessageRef={lastMessageRef}/>
            <ChatFooter socket={socket}/>
          </>
        )}
        {showProfile && <Profile />}
      </div>
    </div>
  );
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ setShowProfile }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('usnermae');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Username</p>
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
  return (
    <>
      <div className="message__container">
        {messages.map((message: MessageData) =>
          message.name === localStorage.getItem('username') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

const ChatFooter = ({ socket }: ChatProps) => {
  const [message, setMessage] = useState<string>('');

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('username')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('username'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
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