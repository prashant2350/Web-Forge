
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 6 + 'px';
  cursor.style.top = mouseY - 6 + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX - 18) * 0.12;
  ringY += (mouseY - ringY - 18) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('button, a, .arch-layer, .feature-card, .problem-card, .timeline-content').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    cursorRing.style.transform = 'scale(1.5)';
    cursorRing.style.borderColor = 'var(--saffron)';
    cursorRing.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorRing.style.transform = 'scale(1)';
    cursorRing.style.borderColor = 'var(--saffron)';
    cursorRing.style.opacity = '0.5';
  });
});

// Particles
const particleContainer = document.getElementById('particles');
const colors = ['#FF6B00', '#138808', '#F5B700', '#003366'];

for (let i = 0; i < 20; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 4 + 2;
  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}%;
    background: ${colors[Math.floor(Math.random() * colors.length)]};
    opacity: ${Math.random() * 0.4 + 0.1};
    animation-duration: ${Math.random() * 20 + 15}s;
    animation-delay: ${Math.random() * 20}s;
  `;
  particleContainer.appendChild(p);
}

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated counter for stats
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    if (target > 1000) {
      el.textContent = Math.floor(current / 1000) + 'K+' + suffix;
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

// Sidebar nav interaction
document.querySelectorAll('.sidebar-nav li').forEach(li => {
  li.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-nav li').forEach(l => l.classList.remove('active'));
    li.classList.add('active');
  });
});

// Typing animation reset
function resetTyping() {
  const typing = document.querySelector('.typing-indicator');
  const messages = document.querySelector('.chat-messages');
  if (!typing || !messages) return;

  setTimeout(() => {
    const newMsg = document.createElement('div');
    newMsg.className = 'msg msg-ai';
    newMsg.style.opacity = '0';
    newMsg.style.transition = 'opacity 0.5s';
    newMsg.textContent = 'x = (-b ± √(b²-4ac)) / 2a — यह formula है। आइए एक example से समझते हैं...';
    typing.before(newMsg);
    setTimeout(() => newMsg.style.opacity = '1', 100);
    typing.style.display = 'none';
    setTimeout(() => {
      typing.style.display = 'flex';
      newMsg.remove();
    }, 5000);
  }, 3000);
}
resetTyping();
setInterval(resetTyping, 8000);