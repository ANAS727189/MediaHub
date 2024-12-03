import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <UserContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const ToggleTheme = () => useContext(UserContext);
