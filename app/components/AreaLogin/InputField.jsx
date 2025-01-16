import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Componente InputField que maneja campos de texto y contraseñas
const InputField = ({
  label, // Etiqueta para el campo de entrada
  isPassword = false, // Indica si el campo es para una contraseña
  placeholder, // Texto de marcador de posición
  inputValue, // Valor del campo de entrada
  setInputValue, // Función para actualizar el valor del campo de entrada
  theme, // Tema actual (claro u oscuro)
}) => {
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  
  return (
    <View style={styles.container}>
      {/* Etiqueta del campo de entrada */}
      <Text style={[styles.label, theme.main]}>{label}</Text>
      <View style={[theme.inputLabel, styles.inputContainer]}>
        {/* Campo de entrada de texto */}
        <TextInput
          style={[styles.input, theme.inputLabel]}
          placeholder={placeholder}
          placeholderTextColor={theme.main.color}
          secureTextEntry={isPassword && !showPassword}
          value={inputValue}
          onChangeText={setInputValue}
        />
        {/* Icono para mostrar/ocultar la contraseña */}
        {isPassword && inputValue && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
          >
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Estilos para el componente InputField
const styles = StyleSheet.create({
  container: {
    width: "80%",
    borderColor: "gray",
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    zIndex: 1,
  },
});

export default InputField;
