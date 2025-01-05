/* eslint-disable no-unused-expressions */

import React, { useState } from "react";
import { View, FlatList, Alert, StyleSheet, Pressable, Text } from 'react-native';
import { logger } from "react-native-logs";

import Icon from 'react-native-vector-icons/FontAwesome';
import FormularioMateria from './FormularioMateria';
import Materia  from './Materia'


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
    Alert.alert("Materia Agregada", `Código: ${materia.codigo}\nGrupo: ${materia.grupo}`);
    setMaterias([...materias, materia]);
  };

  const handleDelete = (materia) => {
    
    const newMaterias = materias.filter(item => item.codigo !== materia.codigo);
    log.info(`${materias.length} ${newMaterias.length} ${materia.codigo} ${materia}`)
    setMaterias(newMaterias); // Actualiza el estado con el nuevo arreglo filtrado
  };

  return (
    <View>
      <View style={{backgroundColor: 'rgb(0, 100, 207)'}}>
        <Text style={stylesGestor.titulo}> Lista Tareas</Text>
        <Text style={stylesGestor.description}>Aquí puedes agregar y gestionar tus materias</Text>
        <FormularioMateria onSubmit={handleSubmit} />
      </View>
      {materias.length === 0 ? (
        <View style={stylesGestor.emptyState}>
          <Icon name="exclamation-circle" size={50} color="#FF0000" />
          <Text style={stylesGestor.emptyText}>No tienes materias agregadas</Text>
        </View>
      ) : (
      <View style={stylesGestor.screen}>
        <FlatList
          data={materias}
          keyExtractor={(materia) => materia.codigo}
          renderItem={({ item }) => (
          
            <View style={stylesGestor.materias}>
              <Materia materia={item} />
              <Pressable onPress={() => handleDelete(item)} style={stylesGestor.deleteButton}>
                <Icon name="trash" size={20} color="#FF0000" />
              </Pressable>
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
    // backgroundColor: "rgba(30, 30, 30, 0.46)", // Fondo oscuro de toda la pantalla
    padding: 10,
    // borderTopWidth: 1, // Borde en la parte superior
    borderLeftWidth: 3, // Borde en el lado izquierdo
    borderRightWidth: 3, // Borde en el lado derecho
    borderColor: "#FFFFFF", // Color del borde (blanco en este caso)
  },
  itemWrapper: {
    marginVertical: 2, // Margen entre los elementos
    borderRadius: 8,
    elevation: 5, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container: {
    // flex: 1,
    // padding: 20,
  },
  materias: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  titulo: {
    textDecoration: 'underline',
    fontSize: 20,
    fontFamily: "Georgia", // Puedes cambiar a cualquier fuente que prefieras
    color: "white", // Color blanco
    marginTop: 30, // Espacio superior
    marginHorizontal: 30,
  },
  description: {
    fontSize: 11,
    fontFamily: "Georgia", // Puedes cambiar a cualquier fuente que prefieras
    color: "white", // Color blanco
    marginTop: 10, // Espacio superior
    marginHorizontal: 30,
    marginBottom: 30,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
  },
  emptyState: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    marginHorizontal:10,
  },
  emptyText: {
    fontSize: 18,
    color: '#FF0000',
    marginTop: 10,
  },
});