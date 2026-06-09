// ── Year ───────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Nav scroll state ───────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile menu ────────────────────────────────────────
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav__links');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// ── Active link highlight ──────────────────────────────
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav__links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav__links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => navObserver.observe(s));

// ── Reveal on scroll ───────────────────────────────────
const revealEls = document.querySelectorAll(
  '.about__text, .highlight, .skill-card, .exp, .project, .edu, .section__head'
);
revealEls.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), (i % 3) * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ── Animated metric counters ───────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = target * eased;
    el.textContent = value.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toFixed(decimals) + suffix;
  }
  requestAnimationFrame(tick);
}

const metricObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      metricObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.metric__value').forEach(el => metricObserver.observe(el));