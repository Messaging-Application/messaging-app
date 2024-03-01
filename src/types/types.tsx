import {  Socket } from 'socket.io-client';

export interface ChatProps {
    socket: Socket;
  }
  
export interface ChatBodyProps {
  messages: MessageData[];
  lastMessageRef: React.RefObject<HTMLDivElement>;
}
  
export interface MessageData {
  text: string;
  name: string;
  id: string;
}

export interface ChatHeaderProps {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
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