/**
 * Reusable Share + Cite component for haicogihay.com blog posts.
 *
 * Single source of truth: each post page passes its own article metadata
 * (title, canonical url, author, dates, publisher) into initShareCite().
 * Nothing here is hard-coded per article.
 */
(function (global) {
  var MONTHS_EN = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function parseISODate(iso) {
    if (!iso) return null;
    var parts = iso.split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    return { y: parts[0], m: parts[1], d: parts[2] };
  }

  function formatDateLong(iso) {
    var p = parseISODate(iso);
    return p ? MONTHS_EN[p.m - 1] + ' ' + p.d + ', ' + p.y : '';
  }

  function formatDateShort(iso) {
    var p = parseISODate(iso);
    return p ? p.d + ' ' + MONTHS_EN[p.m - 1] + ' ' + p.y : '';
  }

  function yearOf(iso) {
    var p = parseISODate(iso);
    return p ? String(p.y) : '';
  }

  function initials(given) {
    if (!given) return '';
    return given
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(function (w) { return w[0].toUpperCase() + '.'; })
      .join(' ');
  }

  var COMBINING_MARKS = new RegExp('[\\u0300-\\u036f]', 'g');

  function stripDiacritics(str) {
    return (str || '')
      .normalize('NFD')
      .replace(COMBINING_MARKS, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  function sanitizeKeyPart(str) {
    return stripDiacritics(str).toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function buildCitationKey(author, year, title) {
    var familyPart = sanitizeKeyPart((author && (author.family || author.display)) || 'anon') || 'anon';
    var titlePart = sanitizeKeyPart(title).slice(0, 30);
    return familyPart + (year || 'nd') + titlePart;
  }

  /**
   * article: {
   *   title, url, publisher, excerpt,
   *   published: 'YYYY-MM-DD' | '', updated: 'YYYY-MM-DD' | '',
   *   author: { display, family, given }
   * }
   */
  function generateCitation(article, style) {
    var title = article.title || '';
    var url = article.url || '';
    var publisher = article.publisher || '';
    var author = article.author || {};
    var family = author.family || author.display || '';
    var given = author.given || '';
    var natural = author.display || (given + ' ' + family).trim();
    var year = yearOf(article.published);
    var dateLong = formatDateLong(article.published);

    switch (style) {
      case 'ieee': {
        var ieeeInit = initials(given);
        var ieeeAuthor = (ieeeInit ? ieeeInit + ' ' : '') + family;
        var accessed = formatDateShort(new Date().toISOString().slice(0, 10));
        return ieeeAuthor + ', "' + title + '," ' + publisher + ', ' + (dateLong || 'n.d.') +
          '. [Online]. Available: ' + url + '. [Accessed: ' + accessed + '].';
      }
      case 'bibtex': {
        var key = buildCitationKey(author, year, title);
        return '@online{' + key + ',\n' +
          '  author    = {' + family + ', ' + given + '},\n' +
          '  title     = {' + title + '},\n' +
          '  year      = {' + (year || 'n.d.') + '},\n' +
          '  publisher = {' + publisher + '},\n' +
          '  url       = {' + url + '}\n' +
          '}';
      }
      case 'plain':
      default: {
        return natural + ', "' + title + '," ' + publisher + ', ' + (year || 'n.d.') + '. ' + url;
      }
    }
  }

  function copyToClipboard(text, feedbackEl, message) {
    function done() {
      if (!feedbackEl) return;
      feedbackEl.textContent = '✓ ' + message;
      setTimeout(function () { feedbackEl.textContent = ''; }, 1800);
    }
    if (global.navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* no-op */ }
      document.body.removeChild(ta);
      done();
    }
  }

  function initShareCite(root, article) {
    if (!root || !article || !article.url) return;
    var canonicalUrl = article.url;
    var encodedUrl = encodeURIComponent(canonicalUrl);
    var encodedTitle = encodeURIComponent(article.title || '');

    var shareUrls = {
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl,
      x: 'https://twitter.com/intent/tweet?url=' + encodedUrl + '&text=' + encodedTitle,
      zalo: 'https://sp.zalo.me/share?u=' + encodedUrl,
      linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodedUrl
    };

    var shareFeedback = root.querySelector('[data-role="share-feedback"]');
    var shareEls = root.querySelectorAll('[data-share]');
    for (var i = 0; i < shareEls.length; i++) {
      (function (el) {
        var kind = el.getAttribute('data-share');
        if (kind === 'copy') {
          el.addEventListener('click', function () {
            copyToClipboard(canonicalUrl, shareFeedback, 'Đã copy link');
          });
        } else if (shareUrls[kind]) {
          el.setAttribute('href', shareUrls[kind]);
        }
      })(shareEls[i]);
    }

    var tabs = root.querySelectorAll('.cite-tab');
    var output = root.querySelector('[data-role="cite-output"]');
    var citeFeedback = root.querySelector('[data-role="cite-feedback"]');

    function renderStyle(style) {
      if (!output) return;
      output.value = generateCitation(article, style);
      for (var j = 0; j < tabs.length; j++) {
        var isActive = tabs[j].getAttribute('data-style') === style;
        tabs[j].classList.toggle('is-active', isActive);
        tabs[j].setAttribute('aria-selected', String(isActive));
      }
    }

    for (var k = 0; k < tabs.length; k++) {
      (function (tab) {
        tab.addEventListener('click', function () { renderStyle(tab.getAttribute('data-style')); });
      })(tabs[k]);
    }

    var copyBtn = root.querySelector('[data-role="copy-citation"]');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        if (output) copyToClipboard(output.value, citeFeedback, 'Đã copy trích dẫn');
      });
    }

    var defaultStyle = tabs.length ? tabs[0].getAttribute('data-style') : 'apa';
    renderStyle(defaultStyle);
  }

  global.generateCitation = generateCitation;
  global.initShareCite = initShareCite;
})(window);
