
import { ScrollView, Alert } from 'react-native';
import Materia  from './Materia/Materia'
import FormularioMateria from './FormulrioMateria/FormularioMateria';
import GestorMaterias from './GestorMaterias/GestorMaterias';


export function Main() {
  const handleSubmit = (materia) => {
    Alert.alert("Materia Agregada", `Código: ${materia.codigo}\nGrupo: ${materia.grupo}`);
    // Aquí puedes manejar la materia ingresada, por ejemplo, agregarla a una lista
  };



  return (
    <GestorMaterias/>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
