document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-times');
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      navLinks.classList.remove('active');
      menuToggle.querySelector('i').classList.remove('fa-times');
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Tab functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Update active tab button
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding tab pane
      tabPanes.forEach(pane => pane.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Animate numbers in impacto section
  const animateNumbers = () => {
    const impactoNumbers = document.querySelectorAll('.impacto-number');
    
    impactoNumbers.forEach(number => {
      const target = parseInt(number.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        number.textContent = Math.floor(current);
      }, 16);
    });
  };
  
  // Check if impacto section is in view
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  };
  
  let numbersAnimated = false;
  const impactoSection = document.querySelector('.impacto-section');
  
  const checkAnimation = () => {
    if (isInViewport(impactoSection)) {
      if (!numbersAnimated) {
        animateNumbers();
        numbersAnimated = true;
      }
    }
  };
  
  // Run on load and scroll
  window.addEventListener('load', checkAnimation);
  window.addEventListener('scroll', checkAnimation);
  
  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      
      setTimeout(() => {
        submitBtn.textContent = '¡Mensaje enviado!';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
  
  // Testimonial slider (simple version)
  const testimonios = document.querySelectorAll('.testimonio');
  let currentTestimonio = 0;
  
  function showTestimonio(index) {
    testimonios.forEach((testimonio, i) => {
      testimonio.style.display = i === index ? 'block' : 'none';
    });
  }
  
  // Initialize
  showTestimonio(0);
  
  // Auto-rotate testimonials
  setInterval(() => {
    currentTestimonio = (currentTestimonio + 1) % testimonios.length;
    showTestimonio(currentTestimonio);
  }, 5000);
});