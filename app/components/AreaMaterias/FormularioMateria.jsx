import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";

// Componente del formulario para agregar una materia
const FormularioMateria = ({ onSubmit, theme }) => {
  // Definición de estados locales para el código, grupo y visibilidad del modal
  const [codigo, setCodigo] = useState("");
  const [grupo, setGrupo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Maneja el evento de presionar el botón para agregar una materia
  const handlePress = () => {
    if (codigo.trim() && grupo.trim()) {
      // Llama a la función onSubmit con los valores del formulario
      onSubmit({ codigo, grupo });
      // Reinicia los campos del formulario
      setCodigo("");
      setGrupo("");
      // Cierra el modal
      setModalVisible(false); 
    } else {
      // Muestra una alerta si los campos están vacíos
      Alert.alert("Por favor, completa ambos campos.");
    }
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <Pressable style={[styles.openButton, theme.buttonGestor]} onPress={() => setModalVisible(true)}>
        <Text style={[styles.openButtonText, theme.buttonGestor]}>+ Agregar Materia</Text>
      </Pressable>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, theme.main]}>
            <Text style={[styles.label, theme.main]}>Código de la Materia:</Text>
            <TextInput
              style={[styles.input, theme.inputLabel]}
              placeholder="Ejemplo: MAT101"
              placeholderTextColor={theme.main.color}
              value={codigo}
              onChangeText={setCodigo}
            />
            <Text style={[styles.label, theme.main]}>Grupo:</Text>
            <TextInput
              style={[styles.input, theme.inputLabel]}
              placeholder="Ejemplo: 50"
              placeholderTextColor={theme.main.color}
              value={grupo}
              onChangeText={setGrupo}
            />
            <View style={{flexDirection: 'row', justifyContent: "space-between",}}>
              <Pressable style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Agregar Materia</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Estilos para el formulario
const styles = StyleSheet.create({
  openButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,  // Redondea la esquina superior izquierda
    borderTopRightRadius: 30, // Redondea la esquina superior derecha
    borderBottomLeftRadius: 0, // Sin redondear la esquina inferior izquierda
    borderBottomRightRadius: 0, // Sin redondear la esquina inferior derecha
    alignItems: "center",
    marginBottom: 0,
  },
  openButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.38)",
  },
  modalContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "rgb(1 99 204)",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: "rgb(255 27 27)",
  },
  buttonText: {
    color: "rgb(255,255,255)",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FormularioMateria;
