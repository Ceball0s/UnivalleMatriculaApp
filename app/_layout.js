import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter, Slot, usePathname } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { UserProvider } from '../contexts/UserContext';
import { MateriasProvider } from "../contexts/MateriasContext";

const Layout = () => {
  const router = useRouter();
  const pathname = usePathname(); // Obtén la ruta actual

  // Define los colores de la barra según la ruta
  const navBarColor =
      pathname === "/" ? "rgb(119, 0, 0)" // Color para la ruta "/index"
      : pathname === "/carga"? "rgb(0, 0, 0)" // Color para la ruta "/carga"
      : pathname === "/materias"? "rgb(0, 100, 207)" // Color para la ruta "/materias"
      : "rgb(0, 100, 207)"; // Color predeterminado
  return (
    <SafeAreaProvider>
      <UserProvider>
      <MateriasProvider>
      <SafeAreaView style={{ flex: 1 }}>
      {/* Contenido dinámico de las pantallas */}

        <Slot />

      </SafeAreaView>
      </MateriasProvider>
      </UserProvider>
  
      {/* Barra inferior flotante */}
      <View style={[styles.navBar, { backgroundColor: navBarColor }]}>
      {/* Botón para ir a index.js */}
      <TouchableOpacity
        style={[
          styles.navButton,
          pathname === "/" && styles.activeNavButton, // Estilo adicional si está en "/"
        ]}
        onPress={() => router.push("/")}
      >
        <AntDesign name="user" size={24} color="white" />
        <Text style={styles.navText}>Login</Text>
      </TouchableOpacity>

      {/* Botón flotante para ir a carga.js */}
      {pathname !== "/carga" && ( // Desaparece en la ruta "/carga"
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => router.push("/carga")}
        >
          <AntDesign name="caretright" size={30} color="white" />
        </TouchableOpacity>
      )}

      {/* Botón para ir a materias.js */}
      <TouchableOpacity
        style={[
          styles.navButton,
          pathname === "/materias" && styles.activeNavButton, // Estilo adicional si está en "/materias"
        ]}
        onPress={() => router.push("/materias")}
      >
        <AntDesign name="bars" size={24} color="white" />
        <Text style={styles.navText}>Materias</Text>
      </TouchableOpacity>
    </View>      
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(0, 100, 207)",
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: "auto",
    bottom: 0,
    width: "100%",
    height: 65
  },
  activeNavButton: {
    transform: [{ scale: 1.1 }],
  },
  navButton: { alignItems: "center" },
  navText: { 
    color: "white", 
    fontSize: 12 
  },
  floatingButton: {
    position: "absolute",
    bottom: 5,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "rgb(0, 150, 136)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    left: "54%", 
  },
});

export default Layout;
