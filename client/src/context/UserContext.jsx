import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [userId, setUserId] = useState(null);

  // Initialize userId from localStorage on mount
  useEffect(() => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      // Generate new userId if doesn't exist
      storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userId', storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <UserContext.Provider value={{ darkMode, toggleTheme, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const ToggleTheme = () => useContext(UserContext);
