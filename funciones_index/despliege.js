// Activar el menú desplegable de idioma con animación
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  let abierto = false;

  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation(); // Para que no cierre inmediatamente al hacer click en botón
    abierto = !abierto;
    if (abierto) {
      dropdownMenu.classList.add("show");
    } else {
      dropdownMenu.classList.remove("show");
    }
  });

  // Cierra el menú al hacer clic fuera
  document.addEventListener("click", () => {
    dropdownMenu.classList.remove("show");
    abierto = false;
  });

  // Función para calcular edad
  function mostrarEdadTexto(textoBase) {
    const fechaNacimiento = new Date(2003, 7, 19); // 19 agosto 2003 (mes 7 = agosto)
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return `${textoBase} ${edad} años.`;
  }

  // Detectar idioma desde URL (?lang=es)
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get("lang") || "es";

  // Ruta del archivo JSON según idioma (carpeta sin espacios)
  const jsonPath = `funciones_index/base_${lang}.json`;

  console.log("Cargando JSON desde:", jsonPath);

  // Cargar datos desde JSON
  fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar el JSON, status: " + response.status);
      return response.json();
    })
    .then(data => {
      // Navbar
      document.getElementById("nav-home").textContent = data.navbar.home;
      document.getElementById("nav-contacto").textContent = data.navbar.contacto;

      // Idiomas
      document.getElementById("idioma-titulo").textContent = data.idiomas.titulo;
      document.getElementById("idioma-es").textContent = data.idiomas.es;
      document.getElementById("idioma-ru").textContent = data.idiomas.ru;
      document.getElementById("idioma-en").textContent = data.idiomas.en;

      // Contenido principal
      document.getElementById("titulo-principal").textContent = data.titulo_principal;
      document.getElementById("habilidades-gustos").textContent = data.habilidades_gustos;

      // Lista de habilidades
      const ul = document.getElementById("lista-habilidades");
      ul.innerHTML = "";
      data.lista.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.toLowerCase().includes("edad")
          ? mostrarEdadTexto("Edad:")
          : item;
        ul.appendChild(li);
      });

      // Recomendados
      document.getElementById("titulo-recomendados").textContent = data.recomendados.titulo;
      document.getElementById("btn-biblioteca").textContent = data.recomendados.biblioteca;
      document.getElementById("texto-biblioteca").textContent = data.recomendados.biblioteca_texto;
      document.getElementById("btn-usuarios").textContent = data.recomendados.usuarios;
    })
    .catch(error => {
      console.error("❌ Error al cargar el archivo JSON del idioma:", error);
    });
});
