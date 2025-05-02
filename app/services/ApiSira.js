import fetch from 'node-fetch';
import iconv from 'iconv-lite';
import { Buffer } from "buffer";
var DomParser = require('react-native-html-parser').DOMParser;
// global.Buffer = Buffer;
// var DomParser = require('react-native-html-parser').DOMParser;
// import { logger } from "react-native-logs";
// const log = logger.createLogger();


// Función para obtener el HTML de una URL
const ConsultaSira = (url, options) => {
  return fetch(url, options)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      // Usamos iconv-lite para decodificar el contenido como ISO-8859-1
      const html = iconv.decode(Buffer.from(buffer), 'ISO-8859-1');
      // Creamos un DOM temporal para analizar el HTML y lo retornamos
      return new DomParser({
        errorHandler: {
          warning: function (msg) { console.warn('[xmldom warning]', msg); },
          error: function (msg) { console.warn('[xmldom error]', msg); },
          fatalError: function (msg) { console.error('[xmldom fatalError]', msg); }
        }
      }).parseFromString(html, 'text/html');;
    })
    .catch(error => {
      console.error('Error Haciendo Peticiones Al sira:', error);
      return null;
    });
};

// Función para obtener el nombre de una asignatura basado en el código
export const obtenerNombreAsignatura = async (codigo) => {
  try {
    // URL de la solicitud
    let url = `https://sira1.univalle.edu.co/sra/paquetes/herramientas/wincombo.php?opcion=asignaturaProgramadaActualmente&PHPSESSID=PHPSESSID&patron=${codigo}&variableCalculada=1&patron2=06`;

    // Realizamos la solicitud HTTP
    const response = await ConsultaSira(url);

    if (!response) {
      throw new Error('No se pudo obtener la respuesta de ConsultaSira');
    }

    // Buscamos todas las filas de la tabla
    const ulElements = response.getElementsByTagName('tr');

    // Variable para almacenar el nombre de la asignatura
    let nombreAsignatura = null;

    for (let i = ulElements.length - 1; i >= 0; i--) {
      const ul = ulElements.item(i);
      if (ul) {
        const liElements = ul.getElementsByTagName("td");
        // Si encontramos el nombre de la asignatura, lo almacenamos y salimos del ciclo
        if (liElements.length >= 3 && liElements.item(2).textContent !== null &&
          !liElements.item(2).textContent.includes("\n")) {
          nombreAsignatura = liElements.item(2).textContent;
          break;
        }
      }
    }
    return nombreAsignatura || "Desconocido";
  } catch (error) {
    console.error('Error Haciendo Peticiones Al sira:', error);
    return "Desconocido";
  }
};

// Función para iniciar sesión en el sistema
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
      "Connection": "keep-alive",
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
      } else if (contenido.includes("AVISO 301")) {
        agregarLog("Autenticación fallida, el Usuario no existe");
        return null;
      } else if (contenido.includes("AVISO")) {
        agregarLog("Aun no se puede iniciar sesión, reintentando...");
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

const ObtenerFormularioMatricula = (doc, nombre, accion) => {
  // Buscamos el formulario de matrícula
  const forms = doc.getElementsByTagName('form');
  if (forms.length === 0) {
    throw new Error('No se encontró el formulario');
  }

  for (let i = 0; i < forms.length; i++) {
    const element = forms[i];
    if (element.getAttribute('action') === accion && element.getAttribute('name') === nombre) {
      const inputs = element.getElementsByTagName('input');
      const variables = {};
      let contador = 0;
      for (let j = 0; j < inputs.length; j++) {
        const input = inputs[j];
        variables[input.getAttribute('name')] = input.getAttribute('value');
        contador += 1;
      }
      // console.log(contador); 
      // 25 datos en la primera peticion
      return variables;
    }
  }

  throw new Error('No se encontró el formulario con el nombre especificado');
}

// Función para obtener las cadenas de texto de todas las alertas en un documento HTML
const ObtenerAlertas = (doc) => {
  const scripts = doc.getElementsByTagName('script');
  const alertas = [];

  for (let i = 0; i < scripts.length; i++) {
    const scriptContent = scripts[i].textContent || scripts[i].innerText;
    const alertRegex = /(?<=['"])(.*?)(?=['"])/g;
    let match;

    while ((match = alertRegex.exec(scriptContent)) !== null && scriptContent.includes('alert')) {
      alertas.push(match[1]);
    }
  }

  return alertas.join(' ');
};


// Función para matricular una materia
export const Matricular = async (materia, cookie, updateTaskDetails) => {
  // updateTaskDetails("Característica de pago");
  updateTaskDetails("Matriculando...");
  try {
    const url = "https://sira.univalle.edu.co/sra//paquetes/matricula/index.php";
    //const url = "http://192.168.18.22:5000/sra/paquetes/matricula/index.php"; simulador
    const datos = new URLSearchParams({
      accion: "desplegarFormaIniciarProceso",
      x: 39,
      y: 8
    });
    let variables = {};
    let respuesta = await ConsultaSira(url, {
      method: 'POST',
      body: datos.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: cookie,
      }
    });
    const contenido = respuesta.documentElement.textContent || respuesta.documentElement.innerText;
    if (contenido.includes("AVISO 802") || contenido.includes("El acceso al proceso de matricula no se encuentra habilitado")) {
      updateTaskDetails("El acceso al proceso de matricula no se encuentra habilitado");
      return null;
    }
    updateTaskDetails("llenando formulario de matricula");
    variables = ObtenerFormularioMatricula(respuesta, 'forma', 'index.php');
    variables.asm_asi_codigo = materia.codigo;
    variables.asm_grupo = materia.grupo;
    variables.mx_crd = "21";

    respuesta = await ConsultaSira(url, {
      method: 'POST',
      body: (new URLSearchParams(variables)).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: cookie,
      }
    });
    updateTaskDetails("Preciona el boton de 'SI'");
    variables = ObtenerFormularioMatricula(respuesta, 'formaConfirmacion', 'index.php');
    variables.botonAceptar = "SÍ";
    delete variables.botonCancelar;

    respuesta = await ConsultaSira(url, {
      method: 'POST',
      body: (new URLSearchParams(variables)).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: cookie,
      }
    });

    respuesta = ObtenerAlertas(respuesta);
    updateTaskDetails(respuesta);
    if (respuesta.includes("ADVERTENCIA")) {
      return null;
    }
    return true;
  } catch (error) {
    console.error('Error Matriculando:', error);
    return null;
  }
};

