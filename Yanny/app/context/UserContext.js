import { createContext, useContext, useState } from "react";

// Create the context
const UserContext = createContext(null);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores the logged-in user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the user context
export const useUser = () => useContext(UserContext);
