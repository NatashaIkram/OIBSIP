
/**
 * Natasha Ikram — Portfolio 
 * Vanilla JS: navbar blur-on-scroll, mobile menu, scroll reveal, back-to-top.
 * No dependencies. Respects prefers-reduced-motion throughout.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Navbar: transparent -> blurred surface on scroll
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  function updateNavbarState() {
    if (window.scrollY > 12) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  updateNavbarState();
  window.addEventListener('scroll', updateNavbarState, { passive: true });

  /* ---------------------------------------------------------
     Mobile navigation toggle
  --------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navbarMobile');

  function closeMobileNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    navMobile.classList.remove('is-open');
  }

  navToggle.addEventListener('click', function () {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navMobile.classList.toggle('is-open', !isOpen);
  });

  navMobile.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---------------------------------------------------------
     Scroll-triggered reveal animations
  --------------------------------------------------------- */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------------------------
     Wireframe sphere: pause rotation and respond gently to
     pointer position (desktop, fine-pointer only)
  --------------------------------------------------------- */
  const sphereWrap = document.getElementById('sphereWrap');
  const sphereGroup = document.getElementById('sphereGroup');

  if (sphereWrap && sphereGroup && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    sphereWrap.addEventListener('mousemove', function (event) {
      const bounds = sphereWrap.getBoundingClientRect();
      const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (event.clientY - bounds.top) / bounds.height - 0.5;
      sphereGroup.style.transform = 'rotate(' + (relX * 10).toFixed(2) + 'deg) scale(' + (1 + Math.abs(relY) * 0.02).toFixed(3) + ')';
    });

    sphereWrap.addEventListener('mouseleave', function () {
      sphereGroup.style.transform = '';
    });
  }

  /* ---------------------------------------------------------
     Back to top
  --------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     Footer year
  --------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

})();
