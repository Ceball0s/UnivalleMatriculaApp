import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Componente Materia que muestra la información de una materia específica
const Materia = ({ materia, theme }) => {

  // Definimos el nombre e icono de la materia con valores por defecto si no existen
  const nombre = materia && materia.nombre ? materia.nombre : 'Desconocida';
  const icono = materia && materia.icono ? materia.icono : 'book';
  
  return (
    <View style={styles.container}>
      {/* Icono de la materia */}
      <Icon name={icono} size={30} color="#4CAF50" style={styles.icon} />
      <View style={styles.textContainer}>
        {/* Nombre de la materia (truncado si es largo) */}
        <Text style={[styles.nombre, theme.inputLabel]}>{nombre.slice(0, 40)}
          {nombre.length > 40 ? "...": ""}
        </Text>
        <View style={styles.codigosContainer}>
          {/* Código y grupo de la materia */}
          <Text style={[styles.codigo, theme.inputLabel]}>Código: {materia.codigo}</Text>
          <Text style={[styles.grupo, theme.inputLabel]}>Grupo: {materia.grupo}</Text>
        </View>
      </View>
    </View>
  );
};

// Estilos para el componente Materia
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Coloca el ícono y el texto en una fila
    display: 'flex',
    padding: 10,
    alignItems: 'center', // Centra verticalmente los elementos
    boxShadowColor: 'rgb(0, 0, 0)',
    boxShadowOpacity: 0.2,
    boxShadowRadius: 30,
    boxShadowOffset: { width: 5, height: 10 },
    flex: 1,
  },
  icon: {
    marginRight: 15, // Espacio entre el ícono y el texto
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row', // Coloca el ícono y el texto en una fila
    flex: 1, // Hace que el texto ocupe todo el espacio disponible
    flexShrink: 1, // Evita que el contenedor de texto se desborde si el espacio es pequeño
    justifyContent: 'space-between', // Espacia los elementos (nombre y códigos)
  },
  codigosContainer: {
    color: '#888',
    alignItems: 'flex-end', // Alinea los códigos a la derecha
    maxWidth: '50%',
    textDecoration: 'line-through',
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#333',
    maxWidth: '65%',
  },
  codigo: {
    fontSize: 16,
    color: '#555',
  },
  grupo: {
    fontSize: 16,
    color: '#555',
  },
});

export default Materia;
