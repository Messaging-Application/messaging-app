import React, { useState, useEffect } from 'react';
import { UsersListProps, UserData, UserWithChatData } from "../types";
import "../index.css";

const UsersList: React.FC<UsersListProps> = ({ setShowProfile, setSelectedUser, handleShowUser, setChatId, socket }) => {
    // State variables
    const [users, setUsers] = useState<UserWithChatData[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [numberOfUsers, setNumberOfUsers] = useState<number>(0);
    const [addedUsers, setAddedUsers] = useState<number>(0);
    const [newUsers, setNewUsers] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [nextPage, setNextPage] = useState<boolean>(false);
    const pageSize : number = 3;
    console.log(socket);
    const [isLoading, setIsLoading] = useState(false); // State to track loading state
    // Get user from local storage
    const userString = localStorage.getItem("user");
    const user: UserData | null = userString ? JSON.parse(userString) : null;    
    // const [onlineUsers, setOnlineUsers] = useState([]);

    // useEffect(() => {
    //     console.log("!!!");
    //     // Function to fetch online users
    //     const fetchOnlineUsers = async () => {
    //         console.log("!!");
    //         try {
    //             // Send a message to the WebSocket server indicating you want to fetch online users
    //             if (socket.readyState === WebSocket.OPEN) {
    //                 // Send a message to the WebSocket server indicating you want to fetch online users
    //                 const msg = {
    //                     "action" : "getOnlineUsers",
    //                     "sender_id": String(user?.id)
    //                 };
    //                 socket.send(JSON.stringify(msg));
    //             } else {
    //                 console.log("WebSocket connection is still in CONNECTING state.");
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     console.log("!!!!!");
    //     fetchOnlineUsers();
    //     // Set up an interval to fetch online users every 5 minutes (300000 milliseconds)
    //     const interval = setInterval(() => {
    //         fetchOnlineUsers();
    //     }, 9999999999999999999999999999999999999999999999999999);

    //     // Handle messages received from WebSocket server
    //     socket.onmessage = (event) => {
    //       console.log("-----", event.data);
    //       const data = JSON.parse(event.data);
    //       if (data.action === 'updateOnlineUsers') {
    //         // Update online users state with data received from WebSocket server
    //         setOnlineUsers(data.online_user_ids);
    //       }
    //     };
    //     console.log(onlineUsers);
    
    //     // Clean up function to clear interval on component unmount
    //     return () => clearInterval(interval);
    // }, []); // Empty dependency array ensures useEffect runs only once after initial render
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true); // Set loading state to true
                const response = await fetch(`http://localhost:8081/user/all?pageNo=${currentPage}&pageSize=${pageSize}`, {
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

                setTotalPages(responseBody.totalPages);
                const redisData = responseBody.redisData;

                // Update users state with new data
                // Do not add duplicates
                setAddedUsers(0);
                let counter = 0;
                for (const key in redisData) {
                    const tokens = key.split("chat:");
                    const parsedResponse = JSON.parse(redisData[key]);
                    setUsers(users => {
                        const userSet = new Set(users.map(user => user.user.id));
                        if (String(user?.id) === parsedResponse.user2.id) {
                            if (!userSet.has(parsedResponse.user1.id)) {
                                counter++;
                                return [...users, { user: parsedResponse.user1, chat_id: tokens[1] }];
                            }
                        } else if (String(user?.id) === parsedResponse.user1.id) {
                            if (!userSet.has(parsedResponse.user2.id)) {
                                counter++;
                                return [...users, { user: parsedResponse.user2, chat_id: tokens[1] }];
                            }
                        }
                        // Return the current state when conditions don't match
                        return users; 
                    });
                }
                setNumberOfUsers(prevNumberOfUsers => prevNumberOfUsers + counter);
                setAddedUsers(prevAddedUsers => prevAddedUsers + counter);

                setIsLoading(false); // Set loading state to false
                // if (addedUsers === 0) {
                //     if ((numberOfUsers % pageSize === 0) && currentPage > 0) {
                //         console.log("decrementing - current page: ", currentPage, " number of users: ", numberOfUsers);
                //         setCurrentPage(currentPage - 1);
                //     }
                // }

            } catch (error) {
                console.error('Error fetching users:', error);
                setIsLoading(false); // Set loading state to false even in case of error
            }
        };
        fetchUsers();
    }, [currentPage, user?.id, newUsers]); // the dependencies
  
  
    return (
        <div className="chatSidebar">
            <h2>CHAT APP</h2>
            <div>
                <h4 className="chatHeader">Users</h4>
                <div className="chatUsers" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                    {!user?.roles.includes("ROLE_ADMIN") ? (
                        // If the user is not an admin, render the simple button
                        users.map((friend: UserWithChatData, index) => (
                            <button key={index} onClick={() => {setShowProfile(false); setSelectedUser(friend.user); setChatId(friend.chat_id); }} style={{width:"100%", backgroundColor:"transparent", textAlign:"left", paddingLeft:"6px", height:"30pt", color:"grey", fontSize:"15px"}}>
                                <p style={{fontSize:"18px", color:"#5072A7"}}>{friend.user.username}</p>
                            </button>
                        ))
                    ) : (
                        // If the user is an admin, render the button with profile option
                        users.map((friend: UserWithChatData, index) => (
                            <div key={index} className="container">
                                <button onClick={() => {setShowProfile(false); setSelectedUser(friend.user);}} style={{width:"100%", backgroundColor:"transparent", textAlign:"left", paddingLeft:"6px", height:"30pt", color:"grey", fontSize:"15px"}}>
                                    <p style={{fontSize:"18px", color:"#5072A7"}}>{friend.user.username}</p>
                                </button>
                                <button style={{float:"right"}} className="leaveChatButton" onClick={() => {setShowProfile(true); handleShowUser(friend.user); setChatId(friend.chat_id);}}>
                                    Profile
                                </button>
                            </div>
                        ))
                    )}
                    {isLoading && <p>Loading...</p>}
                </div>
                {!isLoading && (
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                   <button style={{float:"right", marginRight:"10px"}} className="leaveChatButton" 
                     onClick={() => {
                        // console.log("current page = ", currentPage, "number of users = ", numberOfUsers, "added users = ", addedUsers);
                        
                        if (addedUsers !== 0 && nextPage === true) {
                            setNextPage(false);
                        }
                        // case that there are less elements in page than expected
                        if (totalPages > currentPage + 1 && addedUsers === 0) {
                            setCurrentPage(currentPage + 1);
                        } else if (addedUsers === 0 && nextPage === true) {
                            console.log("got nothing, stay in ", currentPage);
                        } else if ((numberOfUsers % pageSize === 0) && numberOfUsers != 0) {
                            setCurrentPage(currentPage + 1);
                            setNextPage(true);
                        } else {
                            console.log("not full page - number of users: ", numberOfUsers);
                        }
                        setNewUsers(newUsers + 1);
                      }} 
                      aria-label="Load more">
                    Load more
                  </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersList;
