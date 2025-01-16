import React, { createContext, useState } from 'react';

// Crea el contexto
export const UserContext = createContext();

// Crea el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername, password, setPassword }}>
      {children}
    </UserContext.Provider>
  );
};
