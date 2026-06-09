// ── Year ───────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Terminal typewriter ────────────────────────────────
const lines = [
  { text: '$ whoami', class: 't-green', delay: 0 },
  { text: 'ritish — SRE / DevOps Engineer', class: 't-blue', delay: 600 },
  { text: '$ kubectl get pods --all-namespaces', class: 't-green', delay: 1200 },
  { text: 'All pods Running ✔', class: 't-orange', delay: 1900 },
  { text: '$ terraform apply --auto-approve', class: 't-green', delay: 2700 },
  { text: 'Apply complete! Resources: 12 added.', class: 't-muted', delay: 3500 },
  { text: '$ check uptime', class: 't-green', delay: 4300 },
  { text: 'uptime: 99.9% — incidents: 0', class: 't-yellow', delay: 5100 },
  { text: '$ _', class: 't-blue', delay: 5900 },
];

const body = document.getElementById('terminalBody');

lines.forEach(({ text, class: cls, delay }) => {
  setTimeout(() => {
    const line = document.createElement('div');
    if (text === '$ _') {
      line.innerHTML = '<span class="t-green">$ </span><span class="t-cursor"></span>';
    } else {
      line.className = cls;
      line.textContent = text;
      line.style.opacity = '0';
      line.style.transition = 'opacity 0.3s';
      body.appendChild(line);
      requestAnimationFrame(() => { line.style.opacity = '1'; });
      return;
    }
    body.appendChild(line);
  }, delay);
});

// ── Nav scroll effect ──────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 30
    ? 'rgba(255,255,255,0.1)'
    : 'rgba(255,255,255,0.04)';
});

// ── Active nav link highlight ──────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = '#4f9cf9';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ── Fade-in on scroll ──────────────────────────────────
const fadeEls = document.querySelectorAll('.project-card, .stat-card, .skill-group, .contact__link');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

// ── Mobile nav toggle ──────────────────────────────────
const toggle = document.getElementById('navToggle');
const navLinks2 = document.querySelector('.nav__links');
let menuOpen = false;

toggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navLinks2.style.display = menuOpen ? 'flex' : '';
  navLinks2.style.flexDirection = 'column';
  navLinks2.style.position = 'absolute';
  navLinks2.style.top = '60px';
  navLinks2.style.left = '0';
  navLinks2.style.right = '0';
  navLinks2.style.background = 'rgba(10,12,16,0.97)';
  navLinks2.style.padding = '1rem 2rem';
  navLinks2.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
  if (!menuOpen) navLinks2.removeAttribute('style');
});