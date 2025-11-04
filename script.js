// ===== Confetti Setup =====
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiParticles = [];
const colors = ['#ff6b9d', '#ffa06b', '#c06c84', '#b8e0ff', '#fff4b8', '#ffe5ec'];

class ConfettiParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 3 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
    this.opacity = Math.random() * 0.5 + 0.5;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    if (this.y > canvas.height) {
      this.y = -20;
      this.x = Math.random() * canvas.width;
    }

    if (this.x > canvas.width) this.x = 0;
    else if (this.x < 0) this.x = canvas.width;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

function createConfetti() {
  for (let i = 0; i < 80; i++) {
    confettiParticles.push(new ConfettiParticle());
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateConfetti);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

createConfetti();
animateConfetti();

// ===== Form Submission Handling =====
const form = document.querySelector('.wish-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append('form-name', 'wish-form'); // required for Netlify

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    });

    if (response.ok) {
      form.style.display = 'none';
      successMessage.classList.add('show');
      createBurstConfetti();

      setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        successMessage.classList.remove('show');
      }, 5000);
    } else {
      alert('Oops! Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Oops! Something went wrong. Please try again.');
  }
});

function createBurstConfetti() {
  for (let i = 0; i < 50; i++) {
    const p = new ConfettiParticle();
    p.x = canvas.width / 2;
    p.y = canvas.height / 2;
    p.speedY = (Math.random() - 0.5) * 10;
    p.speedX = (Math.random() - 0.5) * 10;
    confettiParticles.push(p);
  }
}

// ===== Fallback Hero Image =====
const heroImage = document.getElementById('hero-image');
heroImage.addEventListener('error', function() {
  this.src =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="600" viewBox="0 0 500 600"%3E%3Crect fill="%23ffe5ec" width="500" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="%23ff6b9d"%3E🎉 Add Your Photo Here 🎉%3C/text%3E%3Ctext x="50%25" y="55%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="%23c06c84"%3EReplace images/birthday-girl.jpg%3C/text%3E%3C/svg%3E';
});
