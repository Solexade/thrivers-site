// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── FADE-UP ANIMATIONS ───
const faders = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
faders.forEach(el => observer.observe(el));

// ─── MOBILE MENU ───
function toggleMobile() {
  const menu   = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');
  menu.classList.toggle('open');
  burger.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = '';
}
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMobile(); });

// ─── CHALLENGE MODAL (30 Days Form) ───
const modal         = document.getElementById('challengeModal');
const openBtn       = document.getElementById('openChallengeModal');
const closeBtn      = document.getElementById('modalClose');
const challengeIframe  = document.getElementById('challengeIframe');
const modalLoading  = document.getElementById('modalLoading');

let challengeLoaded = false;

function openModal() {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Lazy-load the iframe only once
  if (!challengeLoaded) {
    challengeLoaded = true;
    challengeIframe.src = challengeIframe.getAttribute('data-src');

    challengeIframe.addEventListener('load', () => {
      modalLoading.classList.add('hidden');
      challengeIframe.classList.add('loaded');
    }, { once: true });

    // Fallback: hide spinner after 9s
    setTimeout(() => {
      modalLoading.classList.add('hidden');
      challengeIframe.classList.add('loaded');
    }, 9000);
  }
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Button opens modal
openBtn.addEventListener('click', openModal);

// Close button
closeBtn.addEventListener('click', closeModal);

// Click outside modal box closes it
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Escape key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// ─── ONBOARDING ACCORDION FORM ───
const formWrapper = document.getElementById('formWrapper');
const formToggle  = document.getElementById('formToggle');
const formIcon    = document.getElementById('formIcon');
const formIframe  = document.getElementById('formIframe');
const formLoading = document.getElementById('formLoading');

let formLoaded = false;

formToggle.addEventListener('click', () => {
  const isOpen = formWrapper.classList.toggle('open');
  formIcon.textContent = isOpen ? '▲ Click to Close' : '▼ Click to Open';

  if (isOpen && !formLoaded) {
    formLoaded = true;
    formIframe.src = formIframe.getAttribute('data-src');
    formIframe.addEventListener('load', () => {
      formLoading.classList.add('hidden');
      formIframe.classList.add('loaded');
    }, { once: true });
    setTimeout(() => {
      formLoading.classList.add('hidden');
      formIframe.classList.add('loaded');
    }, 8000);
  }

  if (isOpen) {
    setTimeout(() => formWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  }
});

// ─── COUNTDOWN TIMER ───
function runCountdown() {
  const cdDays  = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins  = document.getElementById('cd-mins');
  const cdSecs  = document.getElementById('cd-secs');
  const cdSub   = document.getElementById('countdown-sub');
  if (!cdDays) return;

  const target = new Date('2026-06-01T00:00:00');
  const pad = n => String(n).padStart(2, '0');

  function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => document.getElementById(id).textContent = '00');
      cdSub.textContent = '🌱 The Challenge is LIVE — Register Now!';
      cdSub.classList.add('challenge-live');
      return;
    }
    cdDays.textContent  = pad(Math.floor(diff / 86400000));
    cdHours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    cdMins.textContent  = pad(Math.floor((diff % 3600000) / 60000));
    cdSecs.textContent  = pad(Math.floor((diff % 60000) / 1000));
  }

  tick();
  setInterval(tick, 1000);
}
runCountdown();

// ─── ACTIVE NAV HIGHLIGHT ───
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + id) link.style.color = 'var(--gold)';
      });
    }
  });
}, { threshold: 0.4 }).observe === undefined || sections.forEach(s => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) link.style.color = 'var(--gold)';
        });
      }
    });
  }, { threshold: 0.4 }).observe(s);
});
