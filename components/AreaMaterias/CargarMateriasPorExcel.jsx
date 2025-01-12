import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { loadExcelFile } from "../../utils/excelHandler";
import Materia from "./Materia";


const CargarMateriasPorExcel = ({ onSubmit }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Función para manejar la selección del archivo
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      
      // Verifica si el usuario canceló la operación
      if (result.canceled) {
        Alert.alert("Operación cancelada", "No se seleccionó ningún archivo.");
        return;
      }

      // Si seleccionaron archivos
      const file = result.assets[0];
      const fileUri = result.assets[0].uri;
      const materias = await loadExcelFile(fileUri);      
      // Guardar los datos en el estado
      
      // log.info(materias)
      // Alert.alert("Archivo cargado", `Se Encontraron ${materias.length} Materias.`);
      
      onSubmit(materias)

      setModalVisible(false); 
      // Alert.alert("Archivo seleccionado", `Nombre: ${file.name}\nTamaño: ${file.size} bytes`);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View>
      {/* Botón para abrir el modal */}
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.openButtonText}>+ Cargar Excel       </Text>
      </TouchableOpacity>

      {/* Modal para cargar materias */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cargar Materias</Text>
            <Text style={styles.modalDescription}>
              Selecciona un archivo Excel con las materias que deseas cargar.
            </Text>

            {/* Botón para seleccionar archivo */}
            <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
              <Text style={styles.buttonText}>Seleccionar Archivo</Text>
            </TouchableOpacity>

            {/* Botón para cerrar el modal */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  openButton: {
    backgroundColor: "rgb(   194, 223, 255   )",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    // borderRadius: 10,
  },
  uploadButton: {
    backgroundColor: "rgb(0, 150, 136)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: "rgb(200, 50, 50)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  openButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", textAlign: "center" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default CargarMateriasPorExcel;
