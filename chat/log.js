let respuestas = {};

// Cargar el JSON externo
fetch('respuestas.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }
    return response.json();
  })
  .then(data => {
    respuestas = data;
    mostrarMensajeInicial();
  })
  .catch(error => {
    console.error("Error cargando el JSON:", error);
    mostrarMensajeError();
    
    // Objeto de respuestas de respaldo
    respuestas = {
      "hola": "¡Hola! ¿En qué puedo ayudarte con el reciclaje? ♻️",
      "donde tiro el plastico": "🟡 Contenedor AMARILLO: Botellas, envases y briks (¡limpios!)",
      "donde tiro el vidrio": "🟢 Contenedor VERDE: Solo botellas y tarros",
      "donde tiro las pilas": "🔋 Punto limpio o contenedores especiales",
      "adios": "¡Hasta luego! Recuerda reducir, reusar y reciclar 🌱"
    };
    mostrarMensajeInicial();
  });

function responder() {
  const entrada = document.getElementById("entrada");
  const mensaje = entrada.value.trim().toLowerCase();
  
  if (mensaje === "") return;

  const chatContainer = document.getElementById("chat-container");

  // Mensaje del usuario
  const userMsg = document.createElement("div");
  userMsg.className = "mensaje usuario";
  userMsg.textContent = mensaje;
  chatContainer.prepend(userMsg);

  // Buscar respuesta
  let respuesta = buscarRespuesta(mensaje);
  
  const botMsg = document.createElement("div");
  botMsg.className = "mensaje bot";
  botMsg.textContent = respuesta;
  chatContainer.prepend(botMsg);

  entrada.value = "";
  chatContainer.scrollTop = 0;
}

function buscarRespuesta(mensaje) {
  // 1. Coincidencia exacta
  if (respuestas[mensaje]) {
    return respuestas[mensaje];
  }
  
  // 2. Coincidencia parcial
  for (const clave in respuestas) {
    if (mensaje.includes(clave)) {
      return respuestas[clave];
    }
  }
  
  // 3. Coincidencia aproximada (errores ortográficos)
  const palabras = mensaje.split(' ');
  for (const clave in respuestas) {
    const palabrasClave = clave.split(' ');
    const coincidencias = palabras.filter(palabra => 
      palabrasClave.some(pClave => pClave.startsWith(palabra.substring(0, 3)))
    );
    if (coincidencias.length > 0) {
      return respuestas[clave];
    }
  }
  
  return "No entendí. Prueba con: 'plástico', 'vidrio', 'pilas'";
}

function mostrarMensajeInicial() {
  const chatContainer = document.getElementById("chat-container");
  const bienvenida = document.createElement("div");
  bienvenida.className = "mensaje bot";
  bienvenida.textContent = "Pregúntame sobre reciclaje. Ejemplos: 'plástico', 'vidrio', 'pilas'";
  chatContainer.prepend(bienvenida);
}

function mostrarMensajeError() {
  const chatContainer = document.getElementById("chat-container");
  const errorMsg = document.createElement("div");
  errorMsg.className = "mensaje bot";
  errorMsg.textContent = "⚠️ Error cargando las respuestas. Usando versión básica.";
  chatContainer.prepend(errorMsg);
}