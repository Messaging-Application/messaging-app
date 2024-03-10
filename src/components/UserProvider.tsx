import React, { createContext, useState, ReactNode } from "react";
import { UserData, UserContextType } from "../types";

// Define default values for the context
const defaultUserContext: UserContextType = {
  user: null,
  setUser: () => {}
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Define the state for user data
  const [user, setUser] = useState<UserData | null>(null);

  // Provide the context with the user state and setUser function
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
