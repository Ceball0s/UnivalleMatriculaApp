import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter, Slot, usePathname } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
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


        {/* Barra inferior flotante */}
        <View style={[styles.navBar, { backgroundColor: navBarColor }]}>
          {/* Botón para ir a index.js */}
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push("/")}
          >
            <MaterialIcons name="home" size={24} color="white" />
            <Text style={styles.navText}>Login</Text>
          </TouchableOpacity>

          {/* Botón flotante para ir a carga.js */}
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => router.push("/carga")}
          >
            <MaterialIcons name="play-arrow" size={32} color="white" />
          </TouchableOpacity>

          {/* Botón para ir a materias.js */}
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push("/materias")}
          >
            <MaterialIcons name="list" size={24} color="white" />
            <Text style={styles.navText}>Materias</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </MateriasProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(0, 100, 207)",
    paddingHorizontal: 35,
    paddingVertical: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: "auto",
    bottom: 0,
    width: "100%",
  },
  navButton: { alignItems: "center" },
  navText: { color: "white", fontSize: 12 },
  floatingButton: {
    // position: "absolute",
    // left:140,
    bottom: 10,
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "rgb(0, 150, 136)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default Layout;
