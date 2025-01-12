import React, { useContext } from "react";
import { View, KeyboardAvoidingView, Text, Pressable, StyleSheet, Alert, Platform } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import InputField from "./InputField";
import { UserContext } from "../../contexts/UserContext";

const Login = ({ color }) => {
  const { username, setUsername, password, setPassword } = useContext(UserContext);

  const handleSave = () => {
    Alert.alert("Guardado", "Tu información ha sido guardada.");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ backgroundColor: color }}>
        <View style= {{flexDirection: 'row', alignItems: "center", justifyContent: 'space-between',}}>
          <View style= {{ marginVertical: 50 }}>
            <Text style={styles.titulo}>Inicio</Text>
            <Text style={styles.titulo}>de Sesión</Text>
          </View>
          <Icon name="user-circle" size={100} color="white" style={styles.icon} />
        </View>
        <View style={styles.roundedButton}>
        </View>  
      </View>
      
      <View style={styles.container}>
        <InputField
          label="Usuario"
          placeholder="Ingresa tu usuario"
          inputValue={username}
          setInputValue={setUsername}
        />
        <InputField
          label="Contraseña"
          isPassword
          placeholder="Ingresa tu contraseña"
          inputValue={password}
          setInputValue={setPassword}
        />
        <Pressable style={[styles.saveButton, { backgroundColor: color }]} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </Pressable>
      </View>

    </KeyboardAvoidingView>
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
  titulo: {
    textDecoration: 'underline',
    fontSize: 25,
    fontFamily: "Georgia", // Puedes cambiar a cualquier fuente que prefieras
    color: "white", // Color blanco
    // marginTop: 30, // Espacio superior
    marginLeft:30,
    // marginRight: 50,
    marginHorizontal: 10,
  },
  icon: {
    // marginTop: 20,
    justifyContent: 'flex-end',
    marginRight: 30,

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
    height: 40
  },
  saveButton: {
    // backgroundColor: "rgb(100, 207, 0)", // Color diferente para el botón de guardar
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20, // Bordes completamente redondeados
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
