import {  Socket } from 'socket.io-client';

export interface ChatProps {
    socket: Socket;
    selectedUser: UserData | null; 
}
  
export interface ChatBodyProps {
  messages: MessageData[];
  lastMessageRef: React.RefObject<HTMLDivElement>;
}
  
export interface MessageData {
  messageId: number;
  // chatId: number;
  messageContent: string;
  senderId: number;
  receiverId: number;
  timestamp: Date;
}

export interface ChatHeaderProps {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: UserData | null; 
  handleShowUser: (user: UserData | null) => void; 
}
  

export interface UsersListProps {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserData | null>>; 
  handleShowUser: (user: UserData | null) => void; 
}
  

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roles: string[];
}

export interface UserContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export interface ProfileProps {
  showUser:  UserData | null; 
}