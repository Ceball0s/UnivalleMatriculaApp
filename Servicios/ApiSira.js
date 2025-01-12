import { logger } from "react-native-logs";
import iconv from "iconv-lite";
import { Buffer } from "buffer";
//global.Buffer = Buffer;


var DomParser = require('react-native-html-parser').DOMParser
const log = logger.createLogger();




export const obtenerNombreAsignatura = async (codigo) => {
  try {
    let url = `https://sira1.univalle.edu.co/sra/paquetes/herramientas/wincombo.php?opcion=asignaturaProgramadaActualmente&PHPSESSID=PHPSESSID&patron=${codigo}&variableCalculada=1&patron2=06`;
    // Realizamos la solicitud HTTP
    const response = await fetch(url);
    // Convertimos el cuerpo de la respuesta en un ArrayBuffer
    const buffer = await response.arrayBuffer();

    // Usamos TextDecoder para decodificar el contenido como ISO-8859-1
    const html = iconv.decode(Buffer.from(buffer), 'ISO-8859-1');


    // Creamos un DOM temporal para analizar el HTML
    let doc = new DomParser().parseFromString(html,'text/html')

    // Buscamos todas las filas de la tabla
    const ulElements = doc.getElementsByTagName('tr');

    
    // Variable para almacenar el nombre de la asignatura
    let nombreAsignatura = null;

    for (let i = ulElements.length;  i >= 0 ; i--) {
			const ul = ulElements.item(i)
      if (ul) {
        const liElements = ul.getElementsByTagName("td")
        if (liElements.length >= 3 && liElements.item(2).textContent !== null){
          nombreAsignatura = liElements.item(2).textContent
          break
        }
      }
		}


    // Si encontramos el nombre de la asignatura, lo retornamos, sino retornamos un valor predeterminado
    return nombreAsignatura || "Desconcido";
  } catch (error) {
    log.error("Error al obtener las materias:", error);
    return "error";
  }
};
