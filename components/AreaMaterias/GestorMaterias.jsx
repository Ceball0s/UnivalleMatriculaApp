/* eslint-disable no-unused-expressions */

import React, { useContext } from "react";
import { View, FlatList, Alert, StyleSheet, Pressable, Text,KeyboardAvoidingView, Platform } from 'react-native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import FormularioMateria from './FormularioMateria';
import Materia  from './Materia';
import CargarMateriasPorExcel from './CargarMateriasPorExcel';
import { MateriasContext } from "../../contexts/MateriasContext";
import { obtenerNombreAsignatura } from "../../services/ApiSira";

const GestorMaterias = () => {
  const { materias, setMaterias } = useContext(MateriasContext);
  
  const handleSubmit = async (materia) => {
    //verifica si llega una lista o unitem
    if (Array.isArray(materia)){
      //verificar lista actual
      let nuevoarray = materia 
      //se filtra cada elemento del array
      for (let i = 0; i < materias.length; i++) {
        nuevoarray = nuevoarray.filter( mate => mate.codigo !== materias[i].codigo)
      }
      //guardar lista
      if (nuevoarray.length > 0){
        setMaterias([...materias, ...nuevoarray]);
        Alert.alert("Materias Agregada ", `Se cargaron ${nuevoarray.length}`)
      }  
    } else {
      for (let i = 0; i < materias.length; i++) {
        if (materias[i].codigo === materia.codigo){
          Alert.alert("Materia Repetida", `No se pudo agregar`)
          return;
        }
      }
      materia.nombre = await obtenerNombreAsignatura(materia.codigo);
      Alert.alert("Materia Agregada", `Código: ${materia.codigo}\nGrupo: ${materia.grupo}`)
      setMaterias([...materias, materia]);
    }
    
  };

  const handleDelete = (materia) => {
    const newMaterias = materias.filter(item => item.codigo !== materia.codigo);
    setMaterias(newMaterias); // Actualiza el estado con el nuevo arreglo filtrado
  };
  // style={stylesGestor.screen}
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ backgroundColor: 'rgb(0, 100, 207)' }}>
          <View style={ stylesGestor.titleContainer }>
            <View style={{ maxWidth: '70%' }}>
              <Text style={ stylesGestor.titulo }>Lista Tareas</Text>
              <Text style={ stylesGestor.description }>Aquí puedes agregar y gestionar tus materias</Text>
            </View>
            <FontAwesome6 name="book" size={70} color="white" />
          </View>
          <FormularioMateria onSubmit={handleSubmit} />
        </View>
        <CargarMateriasPorExcel onSubmit={handleSubmit} />
      </KeyboardAvoidingView>

      {materias.length === 0 ? (
        <View style={stylesGestor.emptyState}>
          <AntDesign name="exclamationcircleo" size={60} color="#FF0000" />
          <Text style={stylesGestor.emptyText}>No tienes materias agregadas</Text>
        </View>
      ) : (
      <FlatList
        data={materias}
        keyExtractor={(materia) => materia.codigo + materia.grupo}
        renderItem={({ item }) => (
          <View style={stylesGestor.materias}>
            <Materia materia={item} />
            <Pressable onPress={() => handleDelete(item)} style={stylesGestor.deleteButton}>
              <FontAwesome6 name="trash" size={25} color="#FF0000" />
            </Pressable>
          </View>
        )}
      />

      )}
      
    </View>
  );
};

export default GestorMaterias;

const stylesGestor = StyleSheet.create({
  titleContainer:{ 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginHorizontal: 35,
    marginVertical: 42,
  },
  materias: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  titulo: {
    textDecoration: 'underline',
    fontSize: 25,
    fontFamily: "Georgia", // Puedes cambiar a cualquier fuente que prefieras
    color: "white", // Color blanco
    // marginTop: 55, // Espacio superior
  },
  description: {
    fontSize: 15,
    fontFamily: "Georgia", // Puedes cambiar a cualquier fuente que prefieras
    color: "white", // Color blanco
    marginTop: 10, // Espacio superior
    // marginBottom: 50,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '50%',
    flex: 1
  },
  emptyText: {
    fontSize: 30,
    color: '#FF0000',
    marginTop: 10,
    maxWidth: '80%',
    textAlign: 'center',
  },
});