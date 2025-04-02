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
