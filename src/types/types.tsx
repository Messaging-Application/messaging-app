export interface ChatProps {
    socket: WebSocket;
    selectedUser: UserData | null; 
}
  
export interface ChatBodyProps {
  messages: MessageData[];
  lastMessageRef: React.RefObject<HTMLDivElement>;
  selectedUser: UserData | null; 
}
  
export interface MessageData {
  message : string;
  receiver_id: string;
  sender_id: string;
}

export interface ChatHeaderProps {
  socket: WebSocket;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: UserData | null; 
  handleShowUser: (user: UserData | null) => void; 
  setSelectedUser: React.Dispatch<React.SetStateAction<UserData | null>>; 
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