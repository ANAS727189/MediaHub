import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <UserContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
};

export const ToggleTheme = () => useContext(UserContext);
