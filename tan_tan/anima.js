document.addEventListener('DOMContentLoaded', () => {
  const imagen = document.querySelector('.imagen-circular');
  const botones = document.querySelectorAll('.boton');

  // Animación al tocar la imagen (móviles)
  if ('ontouchstart' in window) {
    imagen.addEventListener('touchstart', () => {
      imagen.classList.remove('saltar');
      void imagen.offsetWidth;
      imagen.classList.add('saltar');
      
      // Confeti al tocar
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    });
  }

  // Confeti al hacer clic en botones
  botones.forEach(boton => {
    boton.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Animación de clic
      boton.classList.add('clickeado');
      setTimeout(() => {
        boton.classList.remove('clickeado');
      }, 300);
      
      // Confeti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      
      // Redirección después de la animación
      setTimeout(() => {
        window.open(boton.href, '_blank');
      }, 800);
    });
  });

  // Efecto de levitación constante para la imagen
  setInterval(() => {
    imagen.style.transform = `translateY(${Math.sin(Date.now()/600)*10}px)`;
  }, 50);
});


document.addEventListener('DOMContentLoaded', () => {
  // Shimeji caminante
  const shimeji = document.getElementById('shimeji');
  const shimejiImg = document.getElementById('shimeji-img');
  const contenedorBotones = document.querySelector('.contenedor-botones');
  
  // Calculamos la posición Y para que quede debajo de los botones
  function posicionarShimeji() {
    const botonesRect = contenedorBotones.getBoundingClientRect();
    shimeji.style.bottom = `calc(100vh - ${botonesRect.top}px + 30px)`;
  }

  // Inicia caminando
  shimeji.classList.add('shimeji-caminando');
  
  // Cambia dirección al hacer clic/tocar
  shimeji.addEventListener('click', () => {
    shimeji.style.animationDirection = 
      (shimeji.style.animationDirection === 'reverse') ? 'normal' : 'reverse';
    shimejiImg.style.transform = 
      shimeji.style.animationDirection === 'reverse' ? 'scaleX(-1)' : 'scaleX(1)';
  });

  // Ajuste inicial y al redimensionar
  posicionarShimeji();
  window.addEventListener('resize', posicionarShimeji);

  // Saltar al interactuar (para desktop)
  if (!('ontouchstart' in window)) {
    shimeji.addEventListener('mouseenter', () => {
      shimejiImg.style.transform = 'translateY(-15px)';
      setTimeout(() => {
        shimejiImg.style.transform = 'translateY(0)';
      }, 300);
    });
  }
});

