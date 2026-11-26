// Marks the entry of the contents list for the section that is on screen.
// Without this script the list still works as plain links.
(function () {
  // On a narrow screen a long list would push the text down, so it opens on request.
  var toc = document.querySelector('.toc');
  var title = toc && toc.querySelector(':scope > p');
  var list = toc && toc.querySelector(':scope > ul');
  if (title && list) {
    var details = document.createElement('details');
    var summary = document.createElement('summary');
    summary.textContent = title.textContent;
    details.appendChild(summary);
    details.appendChild(list);
    title.replaceWith(details);
    var wide = window.matchMedia('(min-width: 64rem)');
    var sync = function () {
      details.open = wide.matches;
    };
    sync();
    wide.addEventListener('change', sync);
    // A choice from the list closes it again on a narrow screen.
    list.addEventListener('click', function (event) {
      if (event.target.closest('a') && !wide.matches) details.open = false;
    });
  }
})();

(function () {
  var links = document.querySelectorAll('.toc a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  var headings = [];
  links.forEach(function (link) {
    var id = decodeURIComponent(link.getAttribute('href').slice(1));
    var heading = document.getElementById(id);
    if (heading) {
      byId[id] = link;
      headings.push(heading);
    }
  });

  function mark(id) {
    links.forEach(function (link) {
      link.removeAttribute('aria-current');
    });
    if (byId[id]) byId[id].setAttribute('aria-current', 'location');
  }

  // The current section is the last heading that has passed the upper third of the window.
  function update() {
    var line = window.innerHeight / 3;
    var current = headings[0];
    headings.forEach(function (heading) {
      if (heading.getBoundingClientRect().top <= line) current = heading;
    });
    mark(current.id);
  }

  var observer = new IntersectionObserver(update, { rootMargin: '0px 0px -66% 0px' });
  headings.forEach(function (heading) {
    observer.observe(heading);
  });
  window.addEventListener('hashchange', update);
  update();
})();
