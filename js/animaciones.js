(function () {
  'use strict';

  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.catalogo-header-section h1, .catalogo-header-section p, .buscador-catalogo-wrapper, #filtrosContenedor, #selectOrdenar, ' +
      '.titulo-seccion, .enlace-ver-todo, .bloque-coleccion, .banner-oferta, .item-producto, .item-catalogo, ' +
      '.franja-confianza .col-6, .tarjeta-historia, .bloque-nosotros, .contacto-caja, .form-contacto-wrap, ' +
      '.contenedor-img-detalle, .contenedor-info-detalle, .acordeon-imperio .accordion-item, .fila-miniaturas .miniatura-item'
    );

    targets.forEach(function (el) {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll');
      }
    });

    const rows = document.querySelectorAll('.row, #filtrosContenedor, #grillaProductos');
    rows.forEach(function (row) {
      const items = row.querySelectorAll('.reveal-on-scroll');
      items.forEach(function (item, idx) {
        const delay = (idx % 4) * 0.22;
        if (delay > 0) {
          item.style.animationDelay = delay + 's';
        }
      });
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      });

      targets.forEach(function (el) {
        if (!el.classList.contains('is-visible')) {
          observer.observe(el);
        }
      });
    } else {
      targets.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }

  function initNavbar() {
    const nav = document.querySelector('.navbar-imperio');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 30) {
        nav.classList.add('navbar-scrolled');
      } else {
        nav.classList.remove('navbar-scrolled');
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initScrollReveal();
      initNavbar();
    });
  } else {
    initScrollReveal();
    initNavbar();
  }

  window.reiniciarAnimacionesReveal = function () {
    setTimeout(initScrollReveal, 30);
  };
})();
