import React, { useContext } from "react";
import { View, KeyboardAvoidingView, Text, Pressable, StyleSheet, Alert, Platform } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import InputField from "./InputField";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { lightTheme, darkTheme } from "../../styles/colors";

// Componente de inicio de sesión
const Login = () => {
  // Obtiene los valores de usuario y contraseña del contexto de usuario
  const { username, setUsername, password, setPassword } = useContext(UserContext);
  // Obtiene el tema actual del contexto de tema
  const { theme } = useContext(ThemeContext);

  // Define el tema actual basado en el valor del contexto
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  // Color personalizado
  const color = "rgb(119, 0, 0)";

  // Maneja la acción de guardar, mostrando una alerta
  const handleSave = () => {
    Alert.alert("Guardado", "Tu información ha sido guardada.");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[{ flex: 1 }, currentTheme.main]}
    >
      <View style={{ backgroundColor: color }}>
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', marginHorizontal: 30 }}>
          <View style={{ marginVertical: 50 }}>
            <Text style={styles.titulo}>Inicio</Text>
            <Text style={styles.titulo}>de Sesión</Text>
          </View>
          <Icon name="user-circle" size={100} color="white" style={styles.icon} />
        </View>
        <View style={[styles.roundedButton, currentTheme.main]}>
        </View>
      </View>
      <View>
        <View style={[styles.LabelContainer]}>
          <InputField
            label="Usuario"
            placeholder="Ingresa tu usuario"
            inputValue={username}
            setInputValue={setUsername}
            theme={currentTheme}
          />
          <InputField
            label="Contraseña"
            isPassword
            placeholder="Ingresa tu contraseña"
            inputValue={password}
            setInputValue={setPassword}
            theme={currentTheme}
          />
          <Pressable style={[styles.saveButton, { backgroundColor: color }]} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

// Estilos para el componente de inicio de sesión
const styles = StyleSheet.create({
  titulo: {
    fontSize: 25,
    fontFamily: "Georgia",
    color: "white",
  },
  icon: {
    justifyContent: 'flex-end',
  },
  roundedButton: {
    backgroundColor: "rgb(255, 255, 255)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,  // Redondea la esquina superior izquierda
    borderTopRightRadius: 30, // Redondea la esquina superior derecha
    borderBottomLeftRadius: 0, // Sin redondear la esquina inferior izquierda
    borderBottomRightRadius: 0, // Sin redondear la esquina inferior derecha
    alignItems: "center",
    marginBottom: 0,
    height: 40,
  },
  LabelContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "75%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
