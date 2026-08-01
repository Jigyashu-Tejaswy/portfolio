/* ===================================================
   JIGYASHU TEJASWY — PORTFOLIO SCRIPT
   =================================================== */

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor grow on interactive elements
document.querySelectorAll('a, button, .skill-card, .project-card, .ach-card, .contact-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2.5)';
    cursorFollower.style.transform += ' scale(1.5)';
    cursorFollower.style.borderColor = 'var(--accent)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
    cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
    cursorFollower.style.borderColor = '';
  });
});

/* ── PARTICLE CANVAS ── */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    const colors = ['139,92,246', '6,182,212', '244,114,182', '52,211,153'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── TYPING ANIMATION ── */
const roles = [
  'scalable backends.',
  'ML pipelines.',
  'REST APIs.',
  'deep learning models.',
  'scientific simulations.',
  'full-stack platforms.'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedText = document.getElementById('typedText');

function typeWriter() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    typedText.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      setTimeout(() => { isDeleting = true; typeWriter(); }, 2000);
      return;
    }
  } else {
    typedText.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, isDeleting ? 60 : 90);
}
setTimeout(typeWriter, 800);

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num[data-target]');
      nums.forEach(num => animateCounter(num, parseInt(num.dataset.target)));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const aboutSection = document.getElementById('about');
if (aboutSection) counterObserver.observe(aboutSection);

/* ── SMOOTH NAV LINKS ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--primary-light)' : '';
  });
});

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg,#34d399,#06b6d4)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

/* ── CARD TILT EFFECT ── */
document.querySelectorAll('.project-card, .skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── GLOWING CURSOR TRAIL ── */
const trail = [];
const TRAIL_LENGTH = 10;

for (let i = 0; i < TRAIL_LENGTH; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed; width: 4px; height: 4px;
    background: rgba(139,92,246,${0.6 - i * 0.05});
    border-radius: 50%; pointer-events: none; z-index: 9997;
    transition: transform ${0.05 + i * 0.03}s;
  `;
  document.body.appendChild(dot);
  trail.push({ el: dot, x: 0, y: 0 });
}

let trailX = 0, trailY = 0;
document.addEventListener('mousemove', e => { trailX = e.clientX; trailY = e.clientY; });

function animateTrail() {
  let lx = trailX, ly = trailY;
  trail.forEach((dot, i) => {
    dot.el.style.transform = `translate(${lx - 2}px, ${ly - 2}px)`;
    lx += (dot.x - lx) * 0.35;
    ly += (dot.y - ly) * 0.35;
    dot.x = lx; dot.y = ly;
  });
  requestAnimationFrame(animateTrail);
}
animateTrail();

/* ── SECTION ENTRANCE GLOW ── */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'none';
      entry.target.offsetHeight; // reflow
      entry.target.style.animation = '';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(s => sectionObserver.observe(s));

/* ── SKILL TAG STAGGER ── */
document.querySelectorAll('.skill-card').forEach(card => {
  const tags = card.querySelectorAll('.tag');
  tags.forEach((tag, i) => {
    tag.style.transitionDelay = `${i * 40}ms`;
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
  });
  card.addEventListener('mouseenter', () => {
    tags.forEach(tag => {
      tag.style.opacity = '1';
      tag.style.transform = 'scale(1)';
    });
  });
  card.addEventListener('mouseleave', () => {
    tags.forEach(tag => {
      tag.style.opacity = '1';
      tag.style.transform = '';
    });
  });
});

/* ── INITIAL TAG VISIBILITY (on load) ── */
window.addEventListener('load', () => {
  document.querySelectorAll('.skill-card .tag').forEach(tag => {
    tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease, background 0.3s ease, border-color 0.3s ease';
    tag.style.opacity = '1';
    tag.style.transform = '';
  });
  // Trigger hero reveal animations
  document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 150);
  });
});
