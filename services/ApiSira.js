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


export const Login = async (usuario, contrasena, agregarLog) => {
  try {
    agregarLog("Obteniendo cookie...");
    const url = "https://sira.univalle.edu.co/sra/";

    const headers = {
      "Accept-Language": "es-419,es;q=0.9",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.140 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-User": "?1",
      "Sec-Fetch-Dest": "document",
      "Sec-Ch-Ua": "\"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": "\"Linux\"",
      "Accept-Encoding": "gzip, deflate, br",
      "Priority": "u=0, i",
      "Connection": "keep-alive"
    };
    
    // Realizar la solicitud inicial para obtener la cookie
    const respuestaInicial = await fetch(url, {
      method: "GET",
      headers: headers,
      credentials: 'omit',

    });
    const cookie = respuestaInicial.headers.get("set-cookie").split(' ')[0];
  
    if (!cookie) {
      agregarLog("Error obteniendo cookie");
      return null;
    }
    log.info(cookie);
    agregarLog("Cookie obtenida");

    const datos = new URLSearchParams({
      redirect: "",
      usu_login_aut: usuario,
      usu_password_aut: contrasena,
      boton: "Ingresar+al+Sistema",
    });

    
    agregarLog("Iniciando sesión...");

    while (true) {
      const respuesta = await fetch(url, {
        method: "POST",
        credentials: 'omit',
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.140 Safari/537.36",
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookie,
        },
        body: datos.toString(),
      });

      const contenido = await respuesta.text();

      if (contenido.includes("ERROR 753")) {
        agregarLog("Contraseña incorrecta");
        return null;
      } else if (contenido.includes("AVISO 301") ){
        agregarLog("Autenticación fallida el Usuario no existe");
        return "null";
      } else if (contenido.includes("AVISO")) {
        agregarLog("No se pudo iniciar sesión, reintentando...");
      } else {
        agregarLog("Inicio de sesión correcto");
        return cookie;
      }
    }
  } catch (error) {
    agregarLog(`Error: ${error.message}`);
    return null;
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Matricular = async (materia, updateTaskDetails) => {
  await delay(3000); // Esperar 3 segundos
  updateTaskDetails(`Matriculando Materia: ${materia}`);
  await delay(3000); // Esperar 3 segundos
  updateTaskDetails(`Precionando Boton 'SI'`);
  await delay(3000); // Esperar 3 segundos
  updateTaskDetails(`Restpuesta pagina`);
  return true;
}