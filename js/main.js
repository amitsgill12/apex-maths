// ─── MOBILE MENU ───
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

// ─── CONTACT FORM ───
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Thanks for getting in touch! We'll respond within 24 hours. For the fastest reply, message us on WhatsApp.");
    contactForm.reset();
  });
}

// ─── FAQ ACCORDION ───
document.querySelectorAll('.faq-accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', !isOpen);
    const body = trigger.nextElementSibling;
    body.style.maxHeight = isOpen ? '0' : body.scrollHeight + 'px';
  });
});

// ─── SMOOTH SCROLL (fallback for older browsers) ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
