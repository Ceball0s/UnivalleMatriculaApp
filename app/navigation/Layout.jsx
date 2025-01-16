import React, { useContext } from "react"; 
import { SafeAreaView } from 'react-native-safe-area-context';
//themas y contextos de thema 
import { ThemeContext } from "../contexts/ThemeContext"; 
import { lightTheme, darkTheme } from "../styles/colors"; 

import NavBar from "../components/NavBar"; 

// Componente Layout que encapsula la estructura principal de la aplicación
const Layout = ({ children, pathname }) => { 
  // Utilizamos el contexto del tema para obtener el tema actual (claro u oscuro)
  const { theme } = useContext(ThemeContext); 
  // Establecemos el tema actual basado en el contexto
  const currentTheme = theme === "light" ? lightTheme : darkTheme; 

  return (
    // Vista de área segura para que el contenido no se superponga con las áreas no seguras del dispositivo (como la barra de estado)
    <SafeAreaView style={[currentTheme.main, { flex: 1 }]}>
      {children}
      {/* Incluimos la barra de navegación y pasamos la ruta actual */}
      <NavBar pathname={pathname} /> 
    </SafeAreaView>
  ); 
};

export default Layout; 
