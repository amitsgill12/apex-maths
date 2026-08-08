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
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  const requiredFields = ['parentName', 'phone', 'email', 'yearGroup', 'consent'];

  // Function expressions, not declarations — Safari/JavaScriptCore has a bug
  // where a `function` declared inside a block at script top level, closing
  // over a sibling let/const from that same block, throws a ReferenceError
  // when called later from an async callback (event handler, observer, etc).
  const fieldValue = (field) => {
    return field.type === 'checkbox' ? field.checked : field.value.trim();
  };

  const showFieldError = (field, message) => {
    const errorEl = document.getElementById(field.name + 'Error');
    if (errorEl) errorEl.textContent = message;
    field.setAttribute('aria-invalid', 'true');
  };

  const clearFieldError = (field) => {
    const errorEl = document.getElementById(field.name + 'Error');
    if (errorEl) errorEl.textContent = '';
    field.removeAttribute('aria-invalid');
  };

  const validateForm = () => {
    let isValid = true;

    requiredFields.forEach((name) => {
      const field = contactForm.elements[name];
      if (!field) return;
      if (!fieldValue(field)) {
        showFieldError(field, field.type === 'checkbox' ? 'Please confirm you agree.' : 'This field is required.');
        isValid = false;
      } else {
        clearFieldError(field);
      }
    });

    const emailField = contactForm.elements.email;
    const emailValue = emailField.value.trim();
    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      showFieldError(emailField, 'Enter a valid email address.');
      isValid = false;
    }

    return isValid;
  };

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        formStatus.className = 'form-status form-status--success';
        formStatus.textContent = "Thanks — we've received your enquiry and will reply within 24 hours.";
        contactForm.reset();
        if (typeof plausible !== 'undefined') plausible('Form Submission');
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      formStatus.className = 'form-status form-status--error';
      formStatus.innerHTML = 'Something went wrong sending that. Message us on <a href="https://wa.me/447908288822" target="_blank" rel="noopener">WhatsApp</a> instead.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Enquiry →';
    }
  });
}

// ─── EMAIL CAPTURE (resources hub + footer, possibly multiple per page) ───
document.querySelectorAll('.email-capture-form').forEach((form) => {
  const status = form.querySelector('.form-status');
  const emailField = form.elements.email;
  const submitBtn = form.querySelector('.form-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailValue = emailField.value.trim();
    if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      emailField.setAttribute('aria-invalid', 'true');
      if (status) {
        status.className = 'form-status form-status--error';
        status.textContent = 'Enter a valid email address.';
      }
      return;
    }
    emailField.removeAttribute('aria-invalid');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    if (status) { status.className = 'form-status'; status.textContent = ''; }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        if (status) {
          status.className = 'form-status form-status--success';
          status.textContent = "Thanks — you're on the list.";
        }
        form.reset();
        if (typeof plausible !== 'undefined') plausible('Form Submission');
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      if (status) {
        status.className = 'form-status form-status--error';
        status.textContent = 'Something went wrong. Try again, or email hello@locustuition.co.uk directly.';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Subscribe';
    }
  });
});

// ─── PLAUSIBLE: BOOKING PAGE VIEW ───
if (document.querySelector('.calendly-inline-widget') && typeof plausible !== 'undefined') {
  plausible('Booking Page View');
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

// ─── STICKY MOBILE CTA ───
const stickyCta = document.getElementById('mobileStickyCta');

if (stickyCta) {
  if (document.querySelector('.calendly-inline-widget')) {
    // book.html already has its own booking flow — suppress entirely
    stickyCta.remove();
  } else {
    let footerVisible = false;
    let keyboardOpen = false;

    // Function expression — see note above the contact-form handlers.
    const updateStickyCta = () => {
      stickyCta.classList.toggle('hidden', footerVisible || keyboardOpen);
    };

    const footerEl = document.querySelector('footer');
    if (footerEl && 'IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        footerVisible = entries[0].isIntersecting;
        updateStickyCta();
      }, { threshold: 0 }).observe(footerEl);
    }

    // Mobile keyboards shrink the visual viewport, not the layout viewport —
    // without this, the bar can float mid-screen on top of an open keyboard
    // and cover form fields.
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        keyboardOpen = window.visualViewport.height < window.innerHeight * 0.75;
        updateStickyCta();
      });
    }
  }
}

// ─── CALENDLY FALLBACK ───
const calendlyWidget = document.querySelector('.calendly-inline-widget');
const calendlyFallback = document.getElementById('calendlyFallback');

if (calendlyWidget && calendlyFallback) {
  setTimeout(() => {
    if (!calendlyWidget.querySelector('iframe')) {
      calendlyFallback.style.display = 'block';
    }
  }, 5000);
}

// ─── TESTIMONIAL CAROUSEL ───
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDots = document.getElementById('testimonialDots');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');

if (testimonialTrack && testimonialDots && testimonialPrev && testimonialNext) {
  const cards = Array.from(testimonialTrack.children);
  let cardsPerView = 3;
  let page = 0;

  // Function expressions — see note above the contact-form handlers.
  const getCardsPerView = () => {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 960) return 2;
    return 3;
  };

  const totalPages = () => {
    return Math.ceil(cards.length / cardsPerView);
  };

  const renderDots = () => {
    testimonialDots.innerHTML = '';
    for (let i = 0; i < totalPages(); i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to reviews page ${i + 1}`);
      if (i === page) dot.setAttribute('aria-current', 'true');
      dot.addEventListener('click', () => {
        page = i;
        update();
      });
      testimonialDots.appendChild(dot);
    }
  };

  const update = () => {
    cardsPerView = getCardsPerView();
    const maxPage = totalPages() - 1;
    if (page > maxPage) page = maxPage;

    // Pixel offset, computed from the actual measured viewport width, rather
    // than translateX(%) — keeps the slide distance exact regardless of how
    // the percentage reference box gets resolved.
    const viewportWidth = testimonialTrack.parentElement.getBoundingClientRect().width;
    testimonialTrack.style.transform = `translateX(-${page * viewportWidth}px)`;

    renderDots();
    testimonialPrev.disabled = page === 0;
    testimonialNext.disabled = page === maxPage;
  };

  testimonialPrev.addEventListener('click', () => {
    if (page > 0) { page--; update(); }
  });
  testimonialNext.addEventListener('click', () => {
    if (page < totalPages() - 1) { page++; update(); }
  });
  window.addEventListener('resize', update);

  update();
}
