
import React, { useState } from "react";
import { View, FlatList, Alert, StyleSheet, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Materia  from '../Materia/Materia'
import FormularioMateria from '../FormulrioMateria/FormularioMateria';
import { logger } from "react-native-logs";

var log = logger.createLogger();

const GestorMaterias = () => {

  const [materias, setMaterias] = useState([]);

  const handleSubmit = (materia) => {
    for (let i = 0; i < materias.length; i++) {
      if (materias[i].codigo === materia.codigo){
        Alert.alert("Materia Repetida", `No se pudo agregar`);
        return;
      }
    }
    Alert.alert("Materia Agregada", `Código: ${materia}\nGrupo: ${materia.grupo}`);
    setMaterias([...materias, materia]);
  };

  const handleDelete = (materia) => {
    
    const newMaterias = materias.filter(item => item.codigo !== materia.codigo);
    log.info(`${materias.length} ${newMaterias.length} ${materia.codigo} ${materia}`)
    setMaterias(newMaterias); // Actualiza el estado con el nuevo arreglo filtrado
  };

  return (
    <View>
      <FormularioMateria onSubmit={handleSubmit} />
      {materias.length === 0 ? ( 
        <Text>Vacio por ahora papu</Text>
      ) : 
      (
      <View style={stylesGestor.screen}>
        <FlatList
          data={materias}
          keyExtractor={(materia) => materia.codigo}
          renderItem={({ item }) => (
            <View style={stylesGestor.itemWrapper}>
              <View style={stylesGestor.container}>
                <Materia materia={item} />
                <Pressable onPress={() => handleDelete(item)} style={stylesGestor.deleteButton}>
                  <Icon name="trash" size={20} color="#FF0000" />
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
      )}
      
      
    </View>
  );
};

export default GestorMaterias;

const stylesGestor = StyleSheet.create({
  screen: {
    // flex: 1,
    backgroundColor: "rgba(30, 30, 30, 0.46)", // Fondo oscuro de toda la pantalla
    padding: 10,
  },
  itemWrapper: {
    marginVertical: 8, // Margen entre los elementos
    borderRadius: 8,
    overflow: "hidden", // Asegura que el borde no se desborde
    backgroundColor: "rgb(240, 240, 240)", // Fondo claro para cada item
    elevation: 3, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "rgb(255, 255, 255)", // Fondo aún más claro dentro del item
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
  },
});