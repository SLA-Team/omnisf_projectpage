const sections = [...document.querySelectorAll('main section[id]')];
const tocLinks = [...document.querySelectorAll('.toc a')];

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    tocLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-12% 0px -65% 0px', threshold: [0, 0.1, 0.3] });
  sections.forEach((section) => observer.observe(section));
}

document.querySelectorAll('.mobile-toc a').forEach((link) => {
  link.addEventListener('click', () => document.querySelector('.mobile-toc').removeAttribute('open'));
});

const copyButton = document.getElementById('copy-bibtex');
copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.getElementById('bibtex').textContent);
    copyButton.textContent = 'Copied';
    window.setTimeout(() => { copyButton.textContent = 'Copy BibTeX'; }, 1800);
  } catch {
    copyButton.textContent = 'Select text to copy';
    window.setTimeout(() => { copyButton.textContent = 'Copy BibTeX'; }, 2400);
  }
});
