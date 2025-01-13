import XLSX from 'xlsx';


const elementoRepetido = (elemento, arreglo) =>{
  for (let i = 0; i < arreglo.length; i++) {
    if(elemento.codigo === arreglo[i].codigo){
      return true;
    }
  }
  return false;
}

const EliminarRepetidos = async (arreglo) => {
  let arregloNuevo = []
  for (let i = 0; i < arreglo.length; i++) {
    if(!elementoRepetido(arreglo[i],arregloNuevo)){
      arregloNuevo.push(arreglo[i])
    }
  }
  return arregloNuevo
};

export const loadExcelFile = async (uri) => {
  try {
    // Leer el archivo como binario
    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();
    // Procesar el archivo con XLSX
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0]; // Obtener la primera hoja
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convertir a JSON

    // Filtrar datos desde la fila 4 en adelante
    const materiasFiltradas = Object.values(sheetData.slice(1).map((row) => ({
      codigo: row['__EMPTY_2'],
      grupo: row['__EMPTY_5'],
      nombre: row['__EMPTY_3'],
    })));

    return EliminarRepetidos(materiasFiltradas.filter(materia => materia && materia.codigo));
  } catch (error) {
    console.error("Error al cargar el archivo Excel:", error);
    throw new Error("No se pudo procesar el archivo Excel.");
  }
};
