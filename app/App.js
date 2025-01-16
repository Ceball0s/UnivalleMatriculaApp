import React, { useState, useEffect, useRef } from "react"; 
import { registerRootComponent } from 'expo'; 
import { NavigationContainer } from "@react-navigation/native"; 

// Importamos los contextos y el navegador de la aplicación
import { ThemeProvider } from "./contexts/ThemeContext"; 
import { UserProvider } from './contexts/UserContext'; 
import { MateriasProvider } from "./contexts/MateriasContext"; 
import AppNavigator from "./navigation/AppNavigator";

// Componente principal de la aplicación
const App = () => { 
  // Estado para la ruta actual
  const [currentRoute, setCurrentRoute] = useState("Login"); 

  return (
    // Proveedor del tema usuario y materias
    <ThemeProvider>
      <UserProvider> 
        <MateriasProvider>
          <NavigationContainer
            onStateChange={(state) => {
              // Obtener la ruta activa al cambiar el estado
              const activeRoute = state.routes[state.index].name; 
              setCurrentRoute(activeRoute); 
            }}
          >
            {/* Navegador de la aplicación con la ruta actual */}
            <AppNavigator pathname={currentRoute}/> 
          </NavigationContainer>
        </MateriasProvider>
      </UserProvider>
    </ThemeProvider>
  ); 
};

// Registrar el componente raíz de la aplicación
registerRootComponent(App); 
export default App; 
