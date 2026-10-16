(function () {
  'use strict';

  // ---------- Nav scrolled state ----------
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Smooth scroll ----------
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

  // ============================================================
  // MUSIC
  // ============================================================
  function renderMusic() {
    const data = window.MUSIC_DATA;
    const section = document.getElementById('music');
    if (!data || !section) return;

    let any = false;

    const buildCategory = (key) => {
      const cat = data[key];
      const wrap = document.getElementById('music-' + key);
      if (!cat || !wrap) return;

      const songs = (cat.songs || []).filter((s) => s && s.title && s.title.trim());
      if (songs.length === 0) { wrap.style.display = 'none'; return; }

      wrap.style.display = '';
      any = true;

      const grid = document.getElementById(key + '-grid');
      if (!grid) return;
      grid.innerHTML = '';

      songs.forEach((song) => {
        const hasYt = song.youtube && song.youtube.trim();
        const hasThumb = song.thumbnail && song.thumbnail.trim();

        const card = document.createElement('article');
        card.className = 'song-card' + (hasYt ? ' playable' : ' soon');

        const thumbHtml = hasThumb
          ? `<img src="${song.thumbnail}" alt="${song.title}" loading="lazy">`
          : `<div class="song-ph"><svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg></div>`;

        const playHtml = hasYt
          ? `<span class="song-play">
               <svg viewBox="0 0 68 48" width="100%" height="100%" aria-hidden="true">
                 <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#FF0000"/>
                 <path d="M45 24 27 14v20" fill="#FFFFFF"/>
               </svg>
             </span>`
          : '';

        card.innerHTML =
          `<div class="song-thumb">${thumbHtml}${playHtml}</div>` +
          `<div class="song-info">` +
            `<h3 class="song-title">${song.title}</h3>` +
            (hasYt ? '' : `<span class="song-tag-soon">Coming Soon</span>`) +
          `</div>`;

        if (hasYt) {
          card.addEventListener('click', () => {
            window.open(song.youtube, '_blank', 'noopener');
          });
        }

        grid.appendChild(card);
      });
    };

    buildCategory('originals');
    buildCategory('covers');

    section.style.display = any ? '' : 'none';
  }

  // ============================================================
  // CONTACT FORM
  // ============================================================
  function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const TO = 'abdullahalmustafa56@gmail.com';

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const s = document.getElementById('cf-subject');
      const n = document.getElementById('cf-name');
      const m = document.getElementById('cf-email');
      const b = document.getElementById('cf-message');
      const fields = [s, n, m, b];

      let missing = false;
      fields.forEach((el) => {
        if (!el.value.trim()) {
          el.classList.add('field-error');
          setTimeout(() => el.classList.remove('field-error'), 500);
          missing = true;
        }
      });
      if (missing) {
        const firstEmpty = fields.find((el) => !el.value.trim());
        if (firstEmpty) firstEmpty.focus();
        return;
      }

      const subj = s.value.trim();
      const name = n.value.trim();
      const em = m.value.trim();
      const msg = b.value.trim();

      const mailSubject = `[${subj}] — from ${name}`;
      const mailBody =
        `Name: ${name}\n` +
        `Email: ${em}\n` +
        `Subject: ${subj}\n\n` +
        `Message:\n${msg}\n\n` +
        `— Sent via abdullahalmustafa.onrender.com`;

      window.location.href =
        `mailto:${TO}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    });
  }

  // ---------- Boot ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderMusic();
      initForm();
    });
  } else {
    renderMusic();
    initForm();
  }
})();
