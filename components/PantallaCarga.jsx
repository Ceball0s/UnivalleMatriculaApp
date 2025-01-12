/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Asegúrate de instalar este paquete

// varibles globales
import { MateriasContext } from "../contexts/MateriasContext";
import { UserContext } from "../contexts/UserContext";

  
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function esperarYLogear(materia, updateTaskDetails) {
  await delay(5000); // Esperar 5 segundos
  updateTaskDetails(`Obteniendo Cookies ${materia}`);
  await delay(5000); // Esperar 5 segundos
  updateTaskDetails(`Intentando logear ${materia}`);
  await delay(5000); // Esperar 5 segundos
  updateTaskDetails(`Logueado Correctamente ${materia}`);
  return "success";
}



const PantallaCargar = () => {
  const { materias, setMaterias } = useContext(MateriasContext);
  const { username, setUsername, password, setPassword } = useContext(UserContext);
  const [tareasIniciadas, setTareasIniciadas] = useState(false);
  // hacer una lista de tareas con cada materia
  const ListaMaterias = materias.map((materia, index) => ({
    id: index + 3, // Generar un ID único
    name: `${materia.codigo} ${materia.grupo}`, // Combinar código y grupo
    status: "pending", // Estado inicial
    details: `Esperando turno.`, // Detalles personalizados
  }));


  const [tasks, setTasks] = useState([
    { id: 1, name: "Iniciando sesión", status: "loading", details: "Iniciando..." },
  ].concat(ListaMaterias));

  //funcion para modificar rapidamente el status y descripcion que es lo que nos interesa modificar
  const modificar_segun_indice = ( indice, status, descripcion) =>{
    let actualElement = tasks[indice]
    status ? actualElement.status = status  : null
    descripcion ? actualElement.details = descripcion : null
    setTasks([...tasks.slice(0, indice), actualElement,...tasks.slice(indice +1, tasks.length)])
  }

  
  useEffect(() => {
  const ejecutarTareas = async () => {
    if (!tareasIniciadas) {
      setTareasIniciadas(true); // Asegúrate de que esto se ejecute solo una vez

      for (let index = 0; index < tasks.length; index++) {
        let tarea = tasks[index];
        tarea.status = 'loading';
        setTasks([...tasks.slice(0, index), tarea, ...tasks.slice(index +1, tasks.length)])
        const salida = await esperarYLogear(tarea.name, (descripcion) => {
          modificar_segun_indice(index, null, descripcion);
        });
        modificar_segun_indice(index, salida, null);
      }
    }
  };
  ejecutarTareas();
  }, [tareasIniciadas]);

  
  const [expandedTask, setExpandedTask] = useState(null);
  const toggleTask = (id) => {
    setExpandedTask((prevId) => (prevId === id ? null : id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Gestión de Tareas</Text>
        <MaterialIcons name="list" size={40} color="white" style={styles.icon} />
      </View>
      {tasks.map((task) => (
        <TouchableOpacity key={task.id} onPress={() => toggleTask(task.id)}>
          <View style={styles.task}>
            <Text style={styles.taskText}>{task.name}</Text>
            <View style={styles.iconContainer}>
              {task.status === "loading" && (
                <ActivityIndicator size="small" color="#007bff" />
              )}
              {task.status === "success" && (
                <MaterialIcons name="check-circle" size={24} color="green" />
              )}
              {task.status === "error" && (
                <MaterialIcons name="error" size={24} color="red" />
              )}
            </View>
          </View>
          {expandedTask === task.id && (
            <View style={styles.details}>
              <Text style={styles.detailsText}>{task.details}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PantallaCargar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(0, 0, 0)",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
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
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
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
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
  },
});
