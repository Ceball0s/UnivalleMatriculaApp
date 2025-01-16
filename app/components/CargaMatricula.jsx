/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Variables globales y contextos
import { MateriasContext } from "../contexts/MateriasContext";
import { UserContext } from "../contexts/UserContext";
import { Login, Matricular } from "../services/ApiSira";
import { ThemeContext } from "../contexts/ThemeContext";
import { lightTheme, darkTheme } from "../styles/colors";

// Componente principal para la carga y matriculación de tareas
const CargaMatricula = () => {
  // Obtener el tema actual del contexto
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  // Obtener las materias y los datos del usuario desde sus respectivos contextos
  const { materias } = useContext(MateriasContext);
  const { username, setUsername, password, setPassword } = useContext(UserContext);

  // Estado para controlar si las tareas han sido iniciadas
  const [tareasIniciadas, setTareasIniciadas] = useState(false);

  // Crear una lista de tareas basada en las materias
  const ListaMaterias = materias.map((materia, index) => ({
    id: index + 3, // Generar un ID único
    name: `${materia.codigo} ${materia.grupo}`, // Combinar código y grupo
    status: "pending", // Estado inicial
    details: `Esperando turno.`, // Detalles personalizados
  }));

  // Estado de las tareas, incluyendo una tarea inicial de inicio de sesión
  const [tasks, setTasks] = useState([
    { id: 1, name: "Iniciando sesión", status: "loading", details: "Iniciando..." },
  ].concat(ListaMaterias));

  // Función para modificar rápidamente el estado de una tarea específica
  const modificar_status = (indice, status) => {
    let actualElement = tasks[indice];
    actualElement.status = status;
    setTasks([...tasks.slice(0, indice), actualElement, ...tasks.slice(indice + 1, tasks.length)]);
  };

  // Función para modificar rápidamente la descripción de una tarea específica
  const modificar_descripcion = (indice, descripcion) => {
    let actualElement = tasks[indice];
    actualElement.details = descripcion;
    setTasks([...tasks.slice(0, indice), actualElement, ...tasks.slice(indice + 1, tasks.length)]);
  };

  // Ejecutar tareas al montar el componente
  useEffect(() => {
    const ejecutarTareas = async () => {
      if (!tareasIniciadas) {
        // Evitar que el useEffect se ejecute cada vez que cambia la interfaz
        setTareasIniciadas(true);

        // Validar si el usuario y la contraseña están vacíos
        if (username === "" || password === "") {
          modificar_status(0, "error");
          modificar_descripcion(0, "Debe ingresar un usuario y contraseña");
          return null;
        }

        // Iniciar sesión y obtener las cookies
        const Cookies = await Login(username, password, (descripcion) => (
          modificar_descripcion(0, descripcion)
        ));

        // Verificar si el inicio de sesión fue exitoso
        if (Cookies === null) {
          modificar_status(0, "error");
          return null;
        }
        modificar_status(0, "success");

        // Matricular materias
        for (let index = 1; index < tasks.length; index++) {
          let tarea = tasks[index];
          tarea.status = 'loading';
          setTasks([...tasks.slice(0, index), tarea, ...tasks.slice(index + 1, tasks.length)]);
          let salida = await Matricular(tarea.name, (descripcion) => {
            modificar_descripcion(index, descripcion);
          });
          salida ? salida = "success" : salida = "error"
          modificar_status(index, salida)
        }
      }
    };
    ejecutarTareas();
  }, [tareasIniciadas]);

  // Estado para controlar la tarea expandida
  const [expandedTask, setExpandedTask] = useState(null);
  const toggleTask = (id) => {
    setExpandedTask((prevId) => (prevId === id ? null : id));
  };

  return (
    <View style={[{ flex: 1 }, currentTheme.main]}>
      <View style={{ backgroundColor: "rgb(0, 0, 0)" }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Gestión de Tareas</Text>
          <FontAwesome name="gears" size={25} color="white" style={styles.icon} />
        </View>
        <View style={[styles.roundedButton, currentTheme.main]}>
        </View> 
      </View>
      
      <View style={{ marginHorizontal: 15 }}>
        {tasks.map((task) => (
          <TouchableOpacity key={task.id} onPress={() => toggleTask(task.id)}>
            <View style={[styles.task, currentTheme.inputLabel]}>
              <Text style={[styles.taskText, currentTheme.inputLabel]}>{task.name}</Text>
              <View style={styles.iconContainer}>
                {task.status === "loading" && (
                  <ActivityIndicator size="small" color="#007bff" />
                )}
                {task.status === "success" && (
                  <FontAwesome name="check-circle" size={24} color="green" />
                )}
                {task.status === "error" && (
                  <FontAwesome name="warning" size={24} color="red" />
                )}
              </View>
            </View>
            {expandedTask === task.id && (
              <View style={[styles.details, currentTheme.inputLabel]}>
                <Text style={[styles.detailsText, currentTheme.inputLabel]}>{task.details}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CargaMatricula;

// Estilos para la pantalla de carga de tareas
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
    marginVertical: 47,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    marginLeft: 10,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#0000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 20,
    flex: 1,
  },
  iconContainer: {
    marginLeft: 10,
  },
  details: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  detailsText: {
    fontSize: 16,
  },
  roundedButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,  
    borderTopRightRadius: 30, 
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: "center",
    marginBottom: 0,
    height: 40,
  },
});
