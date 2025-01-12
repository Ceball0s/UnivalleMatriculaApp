/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

// varibles globales
import { MateriasContext } from "../contexts/MateriasContext";
import { UserContext } from "../contexts/UserContext";
import { Login, Matricular } from "../services/ApiSira";


const PantallaCargar = () => {
  const { materias } = useContext(MateriasContext);
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
  const modificar_status = ( indice, status) =>{
    let actualElement = tasks[indice]
    actualElement.status = status
    setTasks([...tasks.slice(0, indice), actualElement,...tasks.slice(indice +1, tasks.length)])
  }

  const modificar_descripcion = (indice, descripcion) =>{
    let actualElement = tasks[indice]
    actualElement.details = descripcion
    setTasks([...tasks.slice(0, indice), actualElement,...tasks.slice(indice +1, tasks.length)])
  }
  
  useEffect(() => {
  const ejecutarTareas = async () => {
    if (!tareasIniciadas) {
      // variable que evita que el useEffect se ejcute cada que se haga un cambio a la interfaz
      setTareasIniciadas(true);
      if (username === "" || password === ""){
        modificar_status(0, "error")
        modificar_descripcion(0, "Debe ingresar un usuario y contraseña")
        return null;
      }
      //iniciar session, devuelve la cookie para matricular las materias
      const Cookies = await Login(username, password, (descripcion) => (
        modificar_descripcion(0, descripcion)
      ))

      if (Cookies === null){
        modificar_status(0, "error");
        return null;
      }
      modificar_status(0, "success")
      for (let index = 1; index < tasks.length; index++) {
        let tarea = tasks[index];
        tarea.status = 'loading';
        setTasks([...tasks.slice(0, index), tarea, ...tasks.slice(index +1, tasks.length)])
        const salida = await Matricular(tarea.name, (descripcion) => {
          modificar_descripcion(index, descripcion);
        });
        modificar_status(index, salida);
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
    <View>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Gestión de Tareas</Text>
          <FontAwesome name="gears" size={25} color="white" style={styles.icon} />
        </View>
        <View style={styles.roundedButton}>
        </View> 
      </View>
       
      <View style={{marginHorizontal: 15,}}>
        {tasks.map((task) => (
          <TouchableOpacity key={task.id} onPress={() => toggleTask(task.id)}>
            <View style={styles.task}>
              <Text style={styles.taskText}>{task.name}</Text>
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
              <View style={styles.details}>
                <Text style={styles.detailsText}>{task.details}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PantallaCargar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(0, 0, 0)",
  },
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
  roundedButton: {
    backgroundColor: "rgb(255, 255, 255)",
    //redondea la vista
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,  
    borderTopRightRadius: 30, 
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: "center",
    marginBottom: 0,
    height: 40
  },
});
