(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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

  const form = document.getElementById('contact-form');
  if (!form) return;

  const TO = 'abdullahalmustafa56@gmail.com';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const subjectEl = document.getElementById('cf-subject');
    const nameEl    = document.getElementById('cf-name');
    const emailEl   = document.getElementById('cf-email');
    const messageEl = document.getElementById('cf-message');

    const fields = [subjectEl, nameEl, emailEl, messageEl];

    // Validate
    let missing = false;
    fields.forEach((el) => {
      if (!el.value.trim()) {
        el.classList.add('field-error');
        setTimeout(() => el.classList.remove('field-error'), 500);
        missing = true;
      }
    });
    if (missing) {
      const firstEmpty = fields.find(el => !el.value.trim());
      if (firstEmpty) firstEmpty.focus();
      return;
    }

    const subject = subjectEl.value.trim();
    const name    = nameEl.value.trim();
    const email   = emailEl.value.trim();
    const message = messageEl.value.trim();

    const mailSubject = `[${subject}] — from ${name}`;
    const mailBody =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Subject: ${subject}\n\n` +
      `Message:\n${message}\n\n` +
      `— Sent via abdullahalmustafa.onrender.com`;

    window.location.href =
      `mailto:${TO}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  });
})();
ENDOFJS
echo "js/main.js finalized"
