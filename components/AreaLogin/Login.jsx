import React, { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet, Alert } from "react-native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const handleLogin = () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    // Alert.alert("Inicio de sesión exitoso", `Usuario: ${username}`);
  };

  const handleSave = () => {
    Alert.alert("Guardado", "Tu información ha sido guardada.");
  };

  return (
    <View>
      <View style={{backgroundColor: 'rgb(0, 100, 207)', marginBottom:20 }}>
        <Text style={styles.titulo}>Inicio de Sesión</Text>
        <Pressable style={styles.roundedButton}>
          <Text style={styles.buttonText}></Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Contraseña"
            secureTextEntry={!showPassword} // Cambia la visibilidad según el estado
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            style={styles.toggleButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.toggleButtonText}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </Text>
          </Pressable>
        </View>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </Pressable>
      </View>

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  passwordContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  toggleButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "rgb(0, 100, 207)",
    borderRadius: 5,
  },
  titulo: {
    textDecoration: 'underline',
    fontSize: 25,
    fontFamily: "Georgia", // Puedes cambiar a cualquier fuente que prefieras
    color: "white", // Color blanco
    textAlign: 'center',
    marginTop: 50, // Espacio superior
    marginHorizontal: 30,
    marginBottom:40
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
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
  },
  saveButton: {
    backgroundColor: "rgb(100, 207, 0)", // Color diferente para el botón de guardar
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20, // Bordes completamente redondeados
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
