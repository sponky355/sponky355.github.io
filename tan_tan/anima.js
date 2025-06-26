document.addEventListener('DOMContentLoaded', () => {
  // Animación imagen circular
  const imagen = document.querySelector('.imagen-circular');
  if (imagen) {
    if ('ontouchstart' in window) {
      imagen.addEventListener('touchstart', () => {
        imagen.classList.remove('saltar');
        void imagen.offsetWidth;
        imagen.classList.add('saltar');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      });
    } else {
      imagen.addEventListener('mouseenter', () => {
        imagen.style.animation = 'saltito 0.6s ease';
        setTimeout(() => imagen.style.animation = '', 600);
      });
    }
  }

  // Shimeji interactivo
  const shimeji = document.getElementById('shimeji');
  const shimejiImg = document.getElementById('shimeji-img');
  
  if (shimeji && shimejiImg) {
    // Cambiar dirección al clic
    shimeji.addEventListener('click', () => {
      const newDirection = shimeji.style.animationDirection === 'reverse' ? 'normal' : 'reverse';
      shimeji.style.animationDirection = newDirection;
      shimejiImg.classList.toggle('shimeji-volteado');
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.1 } });
    });

    // Efecto salto
    const hacerSaltar = () => {
      shimejiImg.style.transform = 'translateY(-12px)';
      setTimeout(() => shimejiImg.style.transform = 'translateY(0)', 300);
    };

    'ontouchstart' in window 
      ? shimeji.addEventListener('touchstart', hacerSaltar)
      : shimeji.addEventListener('mouseenter', hacerSaltar);
  }

  // Confeti para botones
  document.querySelectorAll('.boton').forEach(boton => {
    boton.addEventListener('click', (e) => {
      e.preventDefault();
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => window.open(boton.href, '_blank'), 800);
    });
  });
});

// Efecto especial al hacer clic en botones
document.querySelectorAll('.boton').forEach(boton => {
  boton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Efecto de explosión de partículas
    for (let i = 0; i < 20; i++) {
      createParticle(this);
    }
    
    // Redirección después de la animación
    setTimeout(() => {
      window.open(this.href, '_blank');
    }, 800);
  });
});

// Función para crear partículas
function createParticle(button) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  document.body.appendChild(particle);
  
  // Posición inicial
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width/2;
  const y = rect.top + rect.height/2;
  
  // Estilo y animación
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.backgroundColor = `hsl(${Math.random() * 60 + 330}, 100%, 70%)`;
  
  // Animación aleatoria
  const angle = Math.random() * Math.PI * 2;
  const velocity = 2 + Math.random() * 3;
  const size = 5 + Math.random() * 10;
  
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  let frame = 0;
  const animate = () => {
    frame++;
    particle.style.transform = `translate(${Math.cos(angle) * velocity * frame}px, 
                                      ${Math.sin(angle) * velocity * frame - frame * 0.1}px)`;
    particle.style.opacity = 1 - frame / 30;
    
    if (frame < 30) {
      requestAnimationFrame(animate);
    } else {
      particle.remove();
    }
  };
  
  animate();
}