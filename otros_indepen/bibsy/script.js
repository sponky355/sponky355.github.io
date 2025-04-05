const imagen = document.getElementById('imagen');
const control = document.getElementById('control');
const maxTranslatePercentage = 50;

// Variables para detectar el deslizamiento
let startTouch = 0;
let endTouch = 0;

control.addEventListener('input', (event) => {
  let translateValue = event.target.value;
  if (translateValue > maxTranslatePercentage) {
    translateValue = maxTranslatePercentage;
  }
  imagen.style.transform = `translate(-50%, -${translateValue}%)`; // Solo mover en el eje Y
});

// Detectar el comienzo del toque
control.addEventListener('touchstart', (event) => {
  startTouch = event.touches[0].clientY;
});

// Detectar el movimiento del toque
control.addEventListener('touchmove', (event) => {
  event.preventDefault(); // Prevenir el comportamiento predeterminado de la barra
  endTouch = event.touches[0].clientY;
  
  let diff = startTouch - endTouch; // Calcular el cambio de la posición del dedo
  let newValue = parseInt(control.value) + (diff / 2); // Ajustar el valor con la diferencia del deslizamiento
  
  // Limitar el valor entre 0 y el máximo
  newValue = Math.max(0, Math.min(newValue, maxTranslatePercentage));
  
  control.value = newValue; // Establecer el nuevo valor del control
  imagen.style.transform = `translate(-50%, -${newValue}%)`; // Actualizar la posición de la imagen
  
  startTouch = endTouch; // Actualizar la posición de inicio del toque
});

// Bloquear desplazamiento horizontal en móviles
document.addEventListener('touchmove', function(event) {
  if (event.scale !== 1) {
    event.preventDefault(); // Evita el zoom con dos dedos
  }
}, { passive: false });

window.addEventListener('scroll', function() {
  window.scrollTo(0, window.scrollY); // Bloquea el desplazamiento horizontal
});
