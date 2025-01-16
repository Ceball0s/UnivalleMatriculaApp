import React, { useContext } from "react";

import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from "../contexts/ThemeContext";

const NavBar = ({ pathname }) =>{
  const router = useNavigation();

  const { theme, toggleTheme } = useContext(ThemeContext);
  // Define los colores de la barra según la ruta
  const color =
    pathname === "Login" ? "rgb(119, 0, 0)" // Color para Login
    :pathname === "Carga"? "rgb(0, 0, 0)" // Color para la vista Matricular
    :pathname === "Materias"? "rgb(0, 100, 207)" // Color para la vista de materias
    :"rgb(0, 100, 207)"; // Color predeterminadoç

  return (
    <View style={[styles.navBar, { backgroundColor: color }]}>
      <StatusBar barStyle="light-contexport default PantallaCargar;ent" backgroundColor={color} />
      {/* Botón para ir a login */}
      <TouchableOpacity
        style={[
          styles.navButton,
          pathname === "Login" && {backgroundColor: "rgb(255,255,255)"},
        ]}
        onPress={() => router.navigate("Login")}
      >
        <AntDesign name="user" size={28} color={pathname === "Login" ? color : "white"} />
      </TouchableOpacity>
      {/* Botón para ir a materias */}
      <TouchableOpacity
        style={[
          styles.navButton,
          pathname === "Materias" && {backgroundColor: "rgb(255,255,255)"},
        ]}
        onPress={() => router.navigate("Materias")}
      >
        <AntDesign name="bars" size={28} color={pathname === "Materias" ? color : "white"} />
      </TouchableOpacity>
      {/* Botón Cambiar el tema */}
      <TouchableOpacity
        style={[
          styles.navButton,
        ]}
        onPress={() => toggleTheme(theme)}
      >
        <Ionicons name={theme === 'light' ? 'moon' : 'sunny'}
          size={28} color="white" />
      </TouchableOpacity>
      {/* Botón flotante para ir a carga */}
      <TouchableOpacity
        style={[
          styles.navButton,
          pathname === "Carga" && {backgroundColor: "rgb(255,255,255)"},
        ]}
        onPress={() => router.navigate("Carga")}
      >
        <AntDesign name="caretright" size={28} color={pathname === "Carga"? color : "white"} />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    bottom: 8,
    width: "auto",
    alignSelf: "center",
    
  },  
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100, // Hace que los botones sean circulares
    marginVertical: 5,
    marginHorizontal: 6,
    padding: 12, 
  },
});
