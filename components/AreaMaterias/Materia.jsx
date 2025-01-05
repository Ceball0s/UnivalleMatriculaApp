import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Materia = ({ materia, nombre = 'Desconocida', icono = 'book' }) => {

  return (
    <View style={styles.container}>
      <Icon name={icono} size={30} color="#4CAF50" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.nombre}>{nombre.slice(0,7)}...</Text>
        <View style={styles.codigosContainer}>
          <Text style={styles.codigo}>Código: {materia.codigo}</Text>
          <Text style={styles.grupo}>Grupo: {materia.grupo}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Esto coloca el ícono y el texto en una fila
    display: 'flex',
    padding: 10,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center', // Centra verticalmente los elementos
    boxShadowColor: ' rgb(0, 0 ,0)',
    boxShadowOpacity: 0.2,
    boxShadowRadius: 30,
    boxShadowOffset: { width: 5, height: 10},
    flex: 1,
    marginBottom: 8,
    
  },
  icon: {
    marginRight: 15, // Espacio entre el ícono y el texto
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row', // Esto coloca el ícono y el texto en una fila
    flex: 1, // Hace que el texto ocupe todo el espacio disponible
    flexShrink: 1, // Evita que el contenedor de texto se desborde si el espacio es pequeño
    justifyContent: 'space-between', // Espacia los elementos (nombre y códigos)
    // maxWidth: '40%' 
  },
  codigosContainer: {
    color: '#888',
    alignItems: 'flex-end', // Alinea los códigos a la derecha
    maxWidth: '50%', 
    textDecoration: 'line-through',
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 18,
    color: ' #333',
  },
  codigo: {
    fontSize: 16,
    color: ' #555',
  },
  grupo: {
    fontSize: 16,
    color: ' #555',
  },
});

export default Materia;
