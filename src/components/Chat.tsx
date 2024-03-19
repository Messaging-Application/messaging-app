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
  ChatFooterProps,
  MessageDataDetailed,
} from "../types";
import axios from 'axios';

const Chat: React.FC<ChatProps> = ({ socket }) => {
  const [showProfile, setShowProfile] = useState<boolean>(true);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null); 
  const [chatId, setChatId] = useState<string>(""); 
  const [showUser, setShowUser] = useState<UserData | null>(null); 

  
  useEffect(() => {
    const fetchMessages = async () => {
        if (chatId) {
          try {
            console.log(chatId);
              const response = await fetch(`http://ec2-35-158-93-2.eu-central-1.compute.amazonaws.com:8080/message/${chatId}`, {
                  method: "GET",
                  credentials: "include", 
                  headers: { 
                      "Content-Type": "application/json",
                      'Authorization': 'Bearer ' + localStorage.getItem("jwt"), 
                  },
              });
              
              console.log('Response status code:', response.status); 
              
              if (!response.ok) {
                  throw new Error("Failed to update messages");
              }
      
              // Parse the response body as JSON
              const responseBody: MessageDataDetailed[]  = await response.json();
              console.log(responseBody);

              // Transforming messages
              const transformedMessages: MessageData[] = responseBody.map((message: MessageDataDetailed) => ({
                message: message.message_content,
                receiver_id: message.receiver_id.toString(), // Assuming receiver_id is a string
                sender_id: message.sender_id.toString() // Assuming sender_id is a string
              }));

              // Setting transformed messages in state
              setMessages(transformedMessages);

  
          } catch (error) {
              console.error('Error fetching users:', error);
          }
        }
    };
    fetchMessages();
  }, [chatId]); // the dependencies

  // Effect to listen for incoming messages from the socket
  useEffect(() => {
    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      // const userString = localStorage.getItem("user");
      // if (userString) {
      //   const userJson = JSON.parse(userString);
      //   console.log("checking");
      //   if ((newMessage.sender_id === String(userJson.id) && newMessage.receiver_id === String(selectedUser?.id)) || (newMessage.sender_id === String(selectedUser?.id) && newMessage.receiver_id === String(userJson.id))) {
          setMessages(prevMessages => [...prevMessages, newMessage]);
        // }
      // }
    };
  }, [socket, selectedUser]);

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
      <UsersList setShowProfile={setShowProfile} setSelectedUser={setSelectedUser} handleShowUser={handleShowUser} setChatId={setChatId} socket={socket}/> 
      <div className="chatMain">
        <ChatHeader socket={socket} setShowProfile={setShowProfile} selectedUser={selectedUser} handleShowUser={handleShowUser} setSelectedUser={setSelectedUser}/> 
        {!showProfile && (
          <>
            <ChatBody messages={messages} lastMessageRef={lastMessageRef} selectedUser={selectedUser}/>
            <ChatFooter socket={socket} selectedUser={selectedUser} chatId={chatId}/>
          </>
        )}
        {showProfile && <Profile key={showUser?.id} showUser={showUser}/>}
      </div>
    </div>
  );
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ socket, setShowProfile, selectedUser, handleShowUser, setSelectedUser }) => {
  const { setUser } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  // Function to handle leaving the chat (logging out)
  const handleLeaveChat = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      // Logout request
      await axios.post('http://ec2-18-197-153-164.eu-central-1.compute.amazonaws.com:8080/auth/logout', {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'credentials': 'include'
        }
      });
      
      // Clear user data and navigate to login page
      socket.close();
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

const ChatBody: React.FC<ChatBodyProps> = ({ messages, lastMessageRef, selectedUser }) => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const userJson = JSON.parse(userString);
    return (
      <>
        <div className="messageContainer">
          {messages.map((message: MessageData, index) =>
            message.sender_id === String(userJson?.id) ? (
              <div className="messageChats" key={index}>
                <p className="senderName">You</p>
                <div className="messageSender">
                  <p>{message.message}</p>
                </div>
              </div>
            ) : (
              <div className="messageChats" key={index}>
                <p>{selectedUser?.username}</p>
                <div className="messageRecipient">
                  <p>{message.message}</p>
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

const ChatFooter = ({ socket, selectedUser, chatId }: ChatFooterProps) => {
  const [message, setMessage] = useState<string>('');
  // Get user data from local storage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  
  // Function to handle sending a message
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if message is not empty and user is logged in
    if (message.trim() && localStorage.getItem('user')) {

      const msg = {
        "action" : "sendMessage",
        "message" : message,
        "sender_id": String(user?.id),
        "receiver_id": selectedUser?.id,
        "chat_id": chatId
      };
      console.log(msg);
      socket.send(JSON.stringify(msg));

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
        <button type="submit" className="sendButton">SEND</button>
      </form>
    </div>
  );
};

export default Chat;