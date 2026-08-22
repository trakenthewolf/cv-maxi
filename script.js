// ============================================================
// Maximiliano Ferreria — Landing page interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Año dinámico en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Preloader: se oculta cuando la página termina de cargar
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const hidePreloader = () => preloader.classList.add('is-hidden');
    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 300);
    } else {
      window.addEventListener('load', () => setTimeout(hidePreloader, 300));
    }
    // Salvavidas: nunca dejar el preloader trabado más de 3s
    setTimeout(hidePreloader, 3000);
  }

  // Menú móvil
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar el menú al elegir un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Resaltar el enlace activo del nav según la sección visible
  const sections = document.querySelectorAll('main .section, .hero');
  const navAnchors = document.querySelectorAll('.nav-links a');

  if ('IntersectionObserver' in window && sections.length && navAnchors.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(sec => { if (sec.id) navObserver.observe(sec); });
  }

  // Animación de revelado al hacer scroll (filas del "libro de cierre", chips, etc.)
  const revealTargets = document.querySelectorAll(
    '[data-reveal], .ledger-row, .skill-group, .edu-item, .contact-card'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: sin IntersectionObserver, mostrar todo directamente
    revealTargets.forEach(el => el.classList.add('in-view'));
  }

  // Encogimiento sutil del nav al hacer scroll
  const nav = document.getElementById('nav');
  if (nav) {
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      nav.style.boxShadow = y > 12 ? '0 8px 24px -18px rgba(28,36,32,0.4)' : 'none';
      lastY = y;
    }, { passive: true });
  }
});
