(function () {
  'use strict';

  // ---------- Nav scrolled state ----------
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 20); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Smooth scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ============================================================
  // MUSIC
  // ============================================================
  function renderMusic() {
    var data = window.MUSIC_DATA;
    var section = document.getElementById('music');
    if (!data || !section) return;

    var any = false;

    var buildCategory = function (key) {
      var cat = data[key];
      var wrap = document.getElementById('music-' + key);
      if (!cat || !wrap) return;

      var songs = (cat.songs || []).filter(function (s) {
        return s && s.title && s.title.trim();
      });
      if (songs.length === 0) { wrap.style.display = 'none'; return; }

      wrap.style.display = '';
      any = true;

      var grid = document.getElementById(key + '-grid');
      if (!grid) return;
      grid.innerHTML = '';

      songs.forEach(function (song) {
        var hasYt = song.youtube && song.youtube.trim();
        var hasThumb = song.thumbnail && song.thumbnail.trim();

        var card = document.createElement('article');
        card.className = 'song-card' + (hasYt ? ' playable' : ' soon');

        var thumbHtml = hasThumb
          ? '<img src="' + song.thumbnail + '" alt="' + song.title + '" loading="lazy">'
          : '<div class="song-ph"><svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg></div>';

        var playHtml = hasYt
          ? '<span class="song-play"><svg viewBox="0 0 68 48" width="100%" height="100%" aria-hidden="true"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#FF0000"/><path d="M45 24 27 14v20" fill="#FFFFFF"/></svg></span>'
          : '';

        card.innerHTML =
          '<div class="song-thumb">' + thumbHtml + playHtml + '</div>' +
          '<div class="song-info">' +
            '<h3 class="song-title">' + song.title + '</h3>' +
          '</div>';

        if (hasYt) {
          card.addEventListener('click', function () {
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
  // DIARY (Stories written by Abdullah)
  // ============================================================
  function renderDiary() {
    var data = window.DIARY_DATA;
    var section = document.getElementById('diary');
    var feed = document.getElementById('diary-feed');
    if (!section || !feed) return;

    var items = (data || []).filter(function (d) {
      return d && d.title && d.title.trim();
    });

    if (items.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';
    feed.innerHTML = '';

    // Show max 2 items on homepage
    var shown = items.slice(0, 2);

    shown.forEach(function (entry) {
      var card = document.createElement('article');
      card.className = 'writing-card';

      var link = entry.link || '#';
      var titleHtml = '<h3 class="writing-title">' + entry.title + '</h3>';
      var dateHtml = entry.date ? '<span class="writing-date">' + entry.date + '</span>' : '';
      var imgHtml = entry.image ? '<div class="writing-image"><img src="' + entry.image + '" alt="' + entry.title + '" loading="lazy"></div>' : '';

      card.innerHTML =
        '<a href="' + link + '" class="writing-link">' +
          imgHtml +
          '<div class="writing-info">' +
            titleHtml +
            dateHtml +
            '<span class="writing-read">Read Story →</span>' +
          '</div>' +
        '</a>';

      feed.appendChild(card);
    });
  }

  // ============================================================
  // CONTACT FORM
  // ============================================================
  function initForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var TO = 'abdullahalmustafa56@gmail.com';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var s = document.getElementById('cf-subject');
      var n = document.getElementById('cf-name');
      var m = document.getElementById('cf-email');
      var b = document.getElementById('cf-message');
      var fields = [s, n, m, b];

      var missing = false;
      fields.forEach(function (el) {
        if (!el.value.trim()) {
          el.classList.add('field-error');
          setTimeout(function () { el.classList.remove('field-error'); }, 500);
          missing = true;
        }
      });
      if (missing) {
        var firstEmpty = fields.find(function (el) { return !el.value.trim(); });
        if (firstEmpty) firstEmpty.focus();
        return;
      }

      var subj = s.value.trim();
      var name = n.value.trim();
      var em = m.value.trim();
      var msg = b.value.trim();

      var mailSubject = '[' + subj + '] — from ' + name;
      var mailBody =
        'Name: ' + name + '\n' +
        'Email: ' + em + '\n' +
        'Subject: ' + subj + '\n\n' +
        'Message:\n' + msg + '\n\n' +
        '— Sent via abdullahalmustafa.onrender.com';

      window.location.href =
        'mailto:' + TO +
        '?subject=' + encodeURIComponent(mailSubject) +
        '&body=' + encodeURIComponent(mailBody);
    });
  }

  // ---------- Boot ----------
  function boot() {
    renderMusic();
    renderDiary();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
