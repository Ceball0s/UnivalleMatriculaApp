import React from "react"; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { enableScreens } from 'react-native-screens';
// importamos las pantallas
import LoginScreen from "../screens/LoginScreen"; 
import MateriasScreen from "../screens/MateriasScreen"; 
import CargaScreen from "../screens/CargaScreen"; 
//importamos el layout
import Layout from "./Layout";

// Habilitamos el uso de pantallas nativas para mejorar el rendimiento
enableScreens();

// Creamos el stack de navegación
const Stack = createNativeStackNavigator(); 

// Componente principal de la navegación de la aplicación
const AppNavigator = ({ pathname }) => { 
  return (
    // Usamos el componente Layout para incluir la barra de navegación y el contenido
    <Layout pathname={pathname}>
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{
          headerShown: false, // Ocultamos el encabezado por defecto
          animationTypeForReplace: 'push', // Tipo de animación al reemplazar una pantalla
          animation: 'fade_from_bottom' // Animación de transición entre pantallas
        }}
      >
        {/* Definimos las pantallas del stack */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Materias" component={MateriasScreen} />
        <Stack.Screen name="Carga" component={CargaScreen} />
      </Stack.Navigator>
    </Layout>
  ); 
};

export default AppNavigator;
