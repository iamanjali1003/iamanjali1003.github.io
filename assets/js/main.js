/* Theme toggle, footer year, and the scroll-spy that highlights the current section. */
(function () {
  var root = document.documentElement;
  var SPRITE = 'assets/icons.svg';
  var button = document.getElementById('theme-btn');

  function showIcon(theme) {
    var use = button && button.querySelector('use');
    if (use) use.setAttribute('href', SPRITE + (theme === 'dark' ? '#i-sun' : '#i-moon'));
  }

  showIcon(root.getAttribute('data-theme'));

  if (button) {
    button.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      showIcon(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var byId = {};
  links.forEach(function (a) {
    var section = document.querySelector(a.getAttribute('href'));
    if (section) byId[section.id] = a;
  });

  if (!('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (l) { l.classList.remove('active'); });
      var link = byId[entry.target.id];
      if (!link) return;
      link.classList.add('active');
      var strip = link.parentElement;
      if (strip.scrollWidth > strip.clientWidth) {
        strip.scrollLeft += link.getBoundingClientRect().left - strip.getBoundingClientRect().left - 6;
      }
    });
  }, { rootMargin: '-64px 0px -70% 0px' });
  Object.keys(byId).forEach(function (id) { observer.observe(document.getElementById(id)); });
})();
