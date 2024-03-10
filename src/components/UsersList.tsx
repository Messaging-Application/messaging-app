import React, { useState, useEffect } from 'react';
import { UsersListProps, UserData } from "../types";
import "../index.css"

const UsersList: React.FC<UsersListProps> = ({ setShowProfile, setSelectedUser, handleShowUser }) => {
    // State variables
    const [users, setUsers] = useState<UserData[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages] = useState(3);
    // Get user from local storage
    const userString = localStorage.getItem("user");
    const user: UserData | null = userString ? JSON.parse(userString) : null;    

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(`http://localhost:8081/user/all?pageNo=${currentPage}&pageSize=${totalPages}`, {
            method: "GET",
            credentials: "include", 
            headers: { 
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + localStorage.getItem("jwt"), 
            },
          });
          
          console.log('Response status code:', response.status); 
          
          if (!response.ok) {
            throw new Error("Failed to update profile");
          }
    
          // Parse the response body as JSON
          const responseBody = await response.json();

          // Update users state with new data
          // Do not add duplicates
          for (const key in responseBody) {
            const parsedResponse = JSON.parse(responseBody[key]);
            setUsers(users => {
              const userSet = new Set(users.map(user => user.id));
              if (!userSet.has(parsedResponse.user2.id)) {
                  return [...users, parsedResponse.user2];
              } else {
                  return users;
              }
            });
          }

        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchUsers();
    }, [currentPage, totalPages]); // the dependencies
    
    // Function to navigate to a specific page
    const goToPage = (page: number) => {
      setCurrentPage(page);
      // Clear existing data before fetching new data
      setUsers([]); 
    };

  
  
    return (
      <div className="chatSidebar">
        <h2>CHAT APP</h2>
        <div>
          <h4 className="chatHeader">Users</h4>
          <div className="chatUsers">
          {!user?.roles.includes("ROLE_ADMIN") ? (
            // If the user is not an admin, render the simple button
            users.map((friend: UserData, index) => (
              <button key={index} onClick={() => {setShowProfile(false); setSelectedUser(friend); }} style={{width:"100%", backgroundColor:"transparent", textAlign:"left", paddingLeft:"6px", height:"30pt", color:"grey", fontSize:"15px"}}>
                <p style={{fontSize:"18px", color:"black"}}><b>{friend.username}</b></p>
              </button>
            ))
          ) : (
            // If the user is an admin, render the button with profile option
            users.map((friend: UserData, index) => (
              <div key={index} className="container">
                <button onClick={() => {setShowProfile(false); setSelectedUser(friend);}} style={{width:"100%", backgroundColor:"transparent", textAlign:"left", paddingLeft:"6px", height:"30pt", color:"grey", fontSize:"15px"}}>
                  <p style={{fontSize:"18px", color:"black"}}><b>{friend.username}</b></p>
                </button>
                <button style={{float:"right", marginRight:"10px"}} className="leaveChatButton" onClick={() => {setShowProfile(true); handleShowUser(friend)}}>
                  Profile
                </button>
              </div>
            ))
          )}
         
          </div>
          <div>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
            style={{
              color: "white",
              backgroundColor: "#4f46e5",
              border: "none",
              borderRadius: "25px",
              padding: "10px 20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              margin: "0 10px",
              fontSize: "18px",
              transition: "background-color 0.3s, transform 0.3s",
            }}
            key={page}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>

            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default UsersList;