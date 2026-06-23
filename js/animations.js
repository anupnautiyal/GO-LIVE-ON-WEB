document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initParallax();
});

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale, .reveal--rotate');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ===== PARALLAX ===== */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (!parallaxElements.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
          const rect = el.getBoundingClientRect();
          const scrolled = window.pageYOffset;
          const offset = rect.top + scrolled;

          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = (scrolled - offset) * speed;
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
