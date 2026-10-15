/* =====================================================================
   Abdullah Al Mustafa — Portfolio Scripts
   ===================================================================== */

(function () {
  'use strict';

  /* ---------- Current year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav: scrolled state ---------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Fade-in on scroll ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    fadeEls.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 60, 400) + 'ms';
      io.observe(el);
    });
  } else {
    fadeEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Smooth scroll for internal links ---------- */
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

  /* ---------- Subtle hero parallax on pointer move ---------- */
  const hero = document.querySelector('.hero');
  const photo = document.querySelector('.photo-frame');
  if (hero && photo && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let raf = null;
    let tx = 0, ty = 0;
    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    hero.addEventListener('pointerleave', () => {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    function apply() {
      photo.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      raf = null;
    }
  }
})();
