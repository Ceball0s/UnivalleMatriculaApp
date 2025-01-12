
const elementoRepetido = (elemento, arreglo) =>{
  for (let i = 0; i < arreglo.length; i++) {
    if(elemento.codigo === arreglo[i].codigo){
      return true;
    }
  }
  return false;
}

export const EliminarRepetidos = async (arreglo) => {
  let arregloNuevo = []
  for (let i = 0; i < arreglo.length; i++) {
    if(!elementoRepetido(arreglo[i],arregloNuevo)){
      arregloNuevo.push(arreglo[i])
    }
  }
  return arregloNuevo
};