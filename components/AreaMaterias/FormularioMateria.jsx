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

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "rgb(   194, 223, 255   )",
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
    backgroundColor: "rgb(0,123,255)",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: "rgb(255,76,76)",
  },
  buttonText: {
    color: "rgb(255,255,255)",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FormularioMateria;
