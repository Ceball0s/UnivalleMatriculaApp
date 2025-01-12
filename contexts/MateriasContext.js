import React, { createContext, useState } from 'react';

// Crea el contexto
export const MateriasContext = createContext();

// Crea el proveedor del contexto
export const MateriasProvider = ({ children }) => {
  const [materias, setMaterias] = useState([]);

  return (
    <MateriasContext.Provider value={{ materias, setMaterias }}>
      {children}
    </MateriasContext.Provider>
  );
};
