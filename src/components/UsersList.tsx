import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChatHeaderProps,
    UserData,
  } from "../types";

const UsersList: React.FC<ChatHeaderProps> = ({ setShowProfile }) => {
    const [users, setUsers] = useState<UserData[]>([]);
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('users');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          setUsers(data.users); 
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []); 
  
    return (
      <div className="chat__sidebar">
        <h2>CHAT APP</h2>
        <div>
          <h4 className="chat__header">Users</h4>
          <div className="chat__users">
          {users.map((user: UserData, index) => (
            // go to this chat
            <button key={index} onClick={() => setShowProfile(false)} style={{width:"100%", backgroundColor:"transparent", textAlign:"left", paddingLeft:"6px", height:"50pt", color:"grey", fontSize:"15px"}}><p style={{fontSize:"18px", color:"black"}}><b>{user.firstname} {user.lastname} ({user.username})</b></p>  <i>Hey i missed you so much, how are you?...</i></button>
          ))}
          <button onClick={() => setShowProfile(false)} style={{width:"100%", backgroundColor:"transparent", textAlign:"left", paddingLeft:"6px", height:"50pt", color:"grey", fontSize:"15px"}}><p style={{fontSize:"18px", color:"black"}}><b>Nefeli</b></p>  <i>Hey, how are you?...</i></button>
          <button onClick={() => setShowProfile(false)} style={{width:"100%", backgroundColor:"transparent", textAlign:"left", paddingLeft:"6px", height:"50pt", color:"grey", fontSize:"15px"}}><p style={{fontSize:"18px", color:"black"}}><b>Mariana</b></p> <i>Hey, how are you?...</i></button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UsersList;