/* =========================================
   JOHN PRECIOUS · PORTFOLIO — SCRIPT 2025
========================================= */

const MY_WHATSAPP = '2349039342965';
const MY_EMAIL    = 'preciousjohnemeka2022@gmail.com';

/* ── THEME TOGGLE ── */
const html      = document.documentElement;
const themeBtn  = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
const osPrefers  = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
applyTheme(savedTheme || osPrefers);

themeBtn.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
});


/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  const btt = document.getElementById('backToTop');
  if (btt) btt.classList.toggle('visible', window.scrollY > 400);
});


/* ── MOBILE MENU ── */
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('hamburger');
  nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', nav.classList.contains('open'));
}
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});


/* ── TYPEWRITER ── */
const roles   = ['Frontend Developer','UI/UX Designer','Flutter Developer','Fintech Builder'];
let roleIdx   = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeEffect() {
  if (!typedEl) return;
  const current = roles[roleIdx];
  if (deleting) {
    typedEl.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    setTimeout(typeEffect, 55);
  } else {
    typedEl.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) { deleting = true; setTimeout(typeEffect, 1400); return; }
    setTimeout(typeEffect, 95);
  }
}
typeEffect();


/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── SKILL BARS ── */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const lvl = bar.getAttribute('data-level');
        setTimeout(() => { bar.style.width = lvl + '%'; }, 200);
      });
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
const skillsSection = document.querySelector('.skills');
if (skillsSection) skillObs.observe(skillsSection);


/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const secObs   = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => secObs.observe(s));


/* ── COPY EMAIL BUTTON ── */
const copyBtn = document.getElementById('copyEmail');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(copyBtn.dataset.copy).then(() => {
      copyBtn.classList.add('copied');
      setTimeout(() => copyBtn.classList.remove('copied'), 2000);
    });
  });
}


/* ── FUN FACT TICKER ── */
const funFacts = [
  'I build UIs faster with coffee ☕',
  'Dark mode is my natural habitat 🌙',
  'I\'ve shipped 6+ live projects 🚀',
  'I speak HTML, CSS, JS & Dart fluently 💬',
  'I once fixed a CORS bug at 2 AM 🐛',
  'Available for remote work worldwide 🌍',
  'I care deeply about pixel-perfect details ✨',
];
let factIdx = 0;
const tickerEl = document.getElementById('funTicker');
if (tickerEl) {
  setInterval(() => {
    tickerEl.style.opacity = '0';
    setTimeout(() => {
      factIdx = (factIdx + 1) % funFacts.length;
      tickerEl.textContent = funFacts[factIdx];
      tickerEl.style.opacity = '1';
    }, 400);
  }, 3500);
}


/* ── CHARACTER COUNT ── */
const msgArea   = document.getElementById('message');
const charCount = document.getElementById('charCount');
const MAX_CHARS = 500;
if (msgArea && charCount) {
  msgArea.addEventListener('input', () => {
    const len = msgArea.value.length;
    charCount.textContent = `${len} / ${MAX_CHARS}`;
    charCount.classList.toggle('over', len > MAX_CHARS);
    if (len > MAX_CHARS) msgArea.value = msgArea.value.slice(0, MAX_CHARS);
  });
}


/* ── CONTACT FORM HELPERS ── */
function getFormData() {
  return {
    name:    document.getElementById('name')?.value.trim()    || '',
    email:   document.getElementById('email')?.value.trim()   || '',
    subject: document.getElementById('subject')?.value.trim() || '',
    message: document.getElementById('message')?.value.trim() || '',
  };
}

function validateForm(data) {
  if (!data.name)    { alert('Please enter your name.'); return false; }
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) { alert('Please enter a valid email.'); return false; }
  if (!data.subject) { alert('Please enter a subject.'); return false; }
  if (!data.message) { alert('Please enter a message.'); return false; }
  return true;
}

function buildWaMessage(d) {
  return encodeURIComponent(
    `Hi John! 👋\n\nName: ${d.name}\nEmail: ${d.email}\n\nSubject: ${d.subject}\n\nMessage:\n${d.message}`
  );
}

function buildMailtoLink(d) {
  const subject = encodeURIComponent(`[Portfolio] ${d.subject} — from ${d.name}`);
  const body    = encodeURIComponent(
    `Hi John,\n\nMy name is ${d.name} and I'm reaching out via your portfolio.\n\nSubject: ${d.subject}\n\nMessage:\n${d.message}\n\nBest regards,\n${d.name}\n${d.email}`
  );
  return `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
}

function showSuccess(btn, label = 'Sent! ✓') {
  const orig = btn.innerHTML;
  btn.innerHTML = `<i class="fas fa-check"></i> ${label}`;
  btn.disabled  = true;
  setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 3000);
}

function openBoth(data) {
  window.open(`https://wa.me/${MY_WHATSAPP}?text=${buildWaMessage(data)}`, '_blank');
  setTimeout(() => { window.location.href = buildMailtoLink(data); }, 600);
}


/* ── SEND VIA WHATSAPP ── */
document.getElementById('sendWa')?.addEventListener('click', () => {
  const data = getFormData();
  if (!validateForm(data)) return;
  window.open(`https://wa.me/${MY_WHATSAPP}?text=${buildWaMessage(data)}`, '_blank');
  showSuccess(document.getElementById('sendWa'), 'Opening WhatsApp…');
});


/* ── SEND VIA EMAIL ── */
document.getElementById('sendEmail')?.addEventListener('click', () => {
  const data = getFormData();
  if (!validateForm(data)) return;
  window.location.href = buildMailtoLink(data);
  showSuccess(document.getElementById('sendEmail'), 'Opening Email…');
});


/* ── SEND TO BOTH (form submit) ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = getFormData();
    if (!validateForm(data)) return;

    const btn  = document.getElementById('sendBoth');
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending…';
    btn.disabled  = true;

    setTimeout(() => {
      openBoth(data);
      btn.innerHTML = '<i class="fas fa-check"></i> Sent to Both!';
      contactForm.classList.add('sent');
      contactForm.reset();
      if (charCount) charCount.textContent = `0 / ${MAX_CHARS}`;

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send to Both';
        btn.disabled  = false;
        contactForm.classList.remove('sent');
      }, 4000);
    }, 800);
  });
}
