(function () {
  'use strict';

  // Current year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Nav scrolled state
  const nav = document.querySelector('.nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Contact form → mailto
  const form = document.getElementById('contact-form');
  if (form) {
    const TO = 'abdullahalmustafa56@gmail.com';

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const subject = document.getElementById('cf-subject').value.trim();
      const name    = document.getElementById('cf-name').value.trim();
      const email   = document.getElementById('cf-email').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      // Basic validation
      if (!subject || !name || !email || !message) {
        // Shake the missing fields
        form.querySelectorAll('[required]').forEach((el) => {
          if (!el.value.trim()) {
            el.classList.add('field-error');
            setTimeout(() => el.classList.remove('field-error'), 500);
          }
        });
        return;
      }

      const mailSubject = `[${subject}] — from ${name}`;
      const mailBody =
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Subject: ${subject}\n\n` +
        `Message:\n${message}\n\n` +
        `— Sent via abdullahalmustafa.onrender.com`;

      const mailto = `mailto:${TO}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
      window.location.href = mailto;
    });
  }
})();
ENDOFJS
echo "js/main.js updated"
