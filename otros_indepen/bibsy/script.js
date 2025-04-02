const imagen = document.getElementById('imagen');
const control = document.getElementById('control');
const maxTranslatePercentage = 50;

control.addEventListener('input', (event) => {
  let translateValue = event.target.value;
  if (translateValue > maxTranslatePercentage) {
    translateValue = maxTranslatePercentage;
  }
  imagen.style.transform = `translate(-50%, -${translateValue}%)`; // Solo mover en el eje Y
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
