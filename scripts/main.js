// DOM Elements
const loader = document.querySelector('.loader');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('header');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const contactForm = document.querySelector('.contact-form');
const inputs = document.querySelectorAll('.form-control');

// Loader
window.addEventListener('load', () => {
  loader.classList.add('loader-hidden');
  setTimeout(() => {
    loader.style.display = 'none';
  }, 500);
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Tab functionality
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    
    // Remove active class from all buttons and contents
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

// Form validation
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'red';
        isValid = false;
      } else {
        input.style.borderColor = '#ddd';
      }
    });
    
    const email = contactForm.querySelector('input[type="email"]');
    if (email && !validateEmail(email.value)) {
      email.style.borderColor = 'red';
      isValid = false;
    }
    
    if (!isValid) {
      e.preventDefault();
      alert('Please fill in all required fields correctly.');
    }
  });
}

// Email validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Input focus effects
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.querySelector('label').style.color = '#4fc3a1';
  });
  
  input.addEventListener('blur', () => {
    input.parentElement.querySelector('label').style.color = '#166088';
  });
});

// Animate stats on scroll (About page)
if (document.querySelector('.stats')) {
  const statNumbers = document.querySelectorAll('.stat-number');
  const duration = 2000; // total animation duration in ms

  const animateCount = (stat) => {
    const target = +stat.getAttribute('data-target');
    let count = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      count = Math.floor(progress * target);
      stat.innerText = count;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        stat.innerText = target; // Ensure it ends exactly
      }
    };

    requestAnimationFrame(update);
  };

  const statsSection = document.querySelector('.stats');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      statNumbers.forEach(stat => animateCount(stat));
      observer.unobserve(statsSection);
    }
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
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