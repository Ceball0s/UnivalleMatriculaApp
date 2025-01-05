import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
} from "react-native";

const FormularioMateria = ({ onSubmit }) => {
  const [codigo, setCodigo] = useState("");
  const [grupo, setGrupo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    if (codigo.trim() && grupo.trim()) {
      onSubmit({ codigo, grupo });
      setCodigo("");
      setGrupo("");
      setModalVisible(false); // Cierra el modal al agregar la materia
    } else {
      alert("Por favor, completa ambos campos.");
    }
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <Pressable style={styles.openButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.openButtonText}>+ Agregar Materia</Text>
      </Pressable>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.label}>Código de la Materia:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: MAT101"
              value={codigo}
              onChangeText={setCodigo}
            />
            <Text style={styles.label}>Grupo:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: 50"
              value={grupo}
              onChangeText={setGrupo}
            />
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
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  openButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
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
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: "#FF4C4C",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FormularioMateria;
