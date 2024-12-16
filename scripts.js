const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const menuIcon = document.getElementById('menuIcon');
const navMenu = document.getElementById('navMenu');

// Toggle navigation menu for small screens
menuIcon.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Responsive canvas particles
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const colors = ['#ff4d4d', '#4dfffc'];

class Particle {
  constructor(x, y, size, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce particles off the walls
    if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
    if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;
  }
}

function createParticles() {
  particlesArray = [];
  const numberOfParticles = 100;
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 2;
    const speedY = (Math.random() - 0.5) * 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
});

// Initialize and start animation
createParticles();
animate();

// Links for toggling forms
// Get elements
const toLogin = document.getElementById('to-login');
const toRegister = document.getElementById('to-register');
const formBox = document.querySelector('.form-box');

// Handle Register Form Submission
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Registration Successful! Switching to login...');
  formBox.classList.add('transform-login');
});

// Handle Login Form Submission (Optional behavior for validation)
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Logged in successfully!');
});

// Toggle Forms
toLogin.addEventListener('click', (e) => {
  e.preventDefault();
  formBox.classList.add('transform-login');
});

toRegister.addEventListener('click', (e) => {
  e.preventDefault();
  formBox.classList.remove('transform-login');
});
