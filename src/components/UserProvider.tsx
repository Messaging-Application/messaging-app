import React, { createContext, useState, ReactNode } from "react";
import {
  UserData,
  UserContextType,
} from "../types";

export const UserContext = createContext<UserContextType>({ user: null, setUser: () => {} });

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};