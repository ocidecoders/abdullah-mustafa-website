const fs = require('fs');
let js = fs.readFileSync('js/main.js', 'utf8');

// Insert renderWritings function before CONTACT FORM block
const insertBefore = `  // ============================================================
  // CONTACT FORM
  // ============================================================`;

const wFunction = `  // ============================================================
  // WRITINGS
  // ============================================================
  function renderWritings() {
    const data = window.WRITINGS_DATA;
    const section = document.getElementById('writings');
    const feed = document.getElementById('writings-feed');
    const more = document.getElementById('writings-more');
    if (!section || !feed) return;

    const items = (data || []).filter((w) => w && w.image && w.image.trim());

    if (items.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';
    feed.innerHTML = '';

    const shown = items.slice(0, 5);

    shown.forEach((w) => {
      const card = document.createElement('article');
      card.className = 'writing-card';

      const link = w.link && w.link.trim() ? w.link : 'writings.html';
      const date = w.date ? `<span class="writing-date">${w.date}</span>` : '';
      const title = w.title ? `<h3 class="writing-title">${w.title}</h3>` : '';

      card.innerHTML =
        \`<a href="\${link}" class="writing-link">
           <div class="writing-image">
             <img src="\${w.image}" alt="\${w.title || 'Writing'}" loading="lazy">
           </div>
           <div class="writing-info">
             \${title}
             \${date}
             <span class="writing-read">Read More →</span>
           </div>
         </a>\`;

      feed.appendChild(card);
    });

    // Show "Read All" if there are more than 5 writings OR always show
    if (more) {
      more.style.display = items.length > 5 ? '' : '';
      // Actually always show "Read All" — the writings.html has all of them
    }
  }

${insertBefore}`;

if (!js.includes('renderWritings')) {
  js = js.replace(insertBefore, wFunction);
  console.log('renderWritings added');
} else {
  console.log('renderWritings already present');
}

// Now add renderWritings() call in boot section
js = js.replace(
  /renderMusic\(\);\s*\n\s*initForm\(\);/g,
  `renderMusic();
      renderWritings();
      initForm();`
);

fs.writeFileSync('js/main.js', js);
console.log('Boot updated');
