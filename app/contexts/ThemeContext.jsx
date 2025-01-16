import React, { createContext, useState } from "react";
import { Appearance} from 'react-native';

// Crea el contexto
export const ThemeContext = createContext();

// Crea el proveedor del contexto
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme() || "light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
