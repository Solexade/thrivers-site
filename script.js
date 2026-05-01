// ─── NAVBAR SCROLL EFFECT ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── FADE-UP SCROLL ANIMATIONS ───
const faders = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

faders.forEach(el => observer.observe(el));

// ─── MOBILE MENU ───
function toggleMobile() {
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');
  menu.classList.toggle('open');
  burger.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

function closeMobile() {
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');
  menu.classList.remove('open');
  burger.classList.remove('open');
  document.body.style.overflow = '';
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMobile();
});

// ─── ANIMATED GOOGLE FORM (click to reveal) ───
const formWrapper  = document.getElementById('formWrapper');
const formToggle   = document.getElementById('formToggle');
const formBody     = document.getElementById('formBody');
const formIcon     = document.getElementById('formIcon');
const formIframe   = document.getElementById('formIframe');
const formLoading  = document.getElementById('formLoading');

let formLoaded = false;

formToggle.addEventListener('click', () => {
  const isOpen = formWrapper.classList.toggle('open');

  if (isOpen) {
    // Update icon text
    formIcon.textContent = '▲ Click to Close';

    // Lazy-load the iframe only on first open
    if (!formLoaded) {
      formLoaded = true;
      const src = formIframe.getAttribute('data-src');
      formIframe.src = src;

      // Show spinner until iframe loads
      formIframe.addEventListener('load', () => {
        formLoading.classList.add('hidden');
        formIframe.classList.add('loaded');
      }, { once: true });

      // Fallback — hide spinner after 8s even if load event doesn't fire
      setTimeout(() => {
        formLoading.classList.add('hidden');
        formIframe.classList.add('loaded');
      }, 8000);
    }

    // Smooth scroll to form after animation starts
    setTimeout(() => {
      formWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);

  } else {
    formIcon.textContent = '▼ Click to Open';
  }
});

// ─── ACTIVE NAV LINK ON SCROLL ───
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + id) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));
