/**
 * animations.ts
 * 
 * Implementación optimizada de animaciones mediante IntersectionObserver.
 * Reemplaza a GSAP para mejorar el rendimiento, reducir el peso del bundle
 * y garantizar compatibilidad perfecta con las transiciones de Astro (ClientRouter).
 */

let observer: IntersectionObserver | null = null;

export function setupAnimations() {
  // 1. Respetar preferencias de accesibilidad del usuario (prefers-reduced-motion)
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  // 2. Configurar el IntersectionObserver
  // rootMargin: "0px 0px -15% 0px" hace que la animación se dispare
  // cuando el elemento está un 15% por encima de la parte inferior de la pantalla.
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -15% 0px",
    threshold: 0,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Toggle de clase para activar/desactivar la transición CSS
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        // Opcional: remover la clase si queremos que la animación 
        // se repita al hacer scroll hacia arriba.
        entry.target.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  // 3. Observar elementos animados estándar
  const selectors = [
    ".scroll-animate",
    ".scroll-animate-left",
    ".scroll-animate-right",
    ".scroll-animate-scale"
  ];
  
  const animatedElements = document.querySelectorAll(selectors.join(", "));
  animatedElements.forEach((el) => observer!.observe(el));

  // 4. Observar contenedores con escalonamiento (stagger)
  const staggerContainers = document.querySelectorAll(".scroll-animate-stagger");
  staggerContainers.forEach((container) => {
    // Seleccionar solo los hijos directos
    const children = container.querySelectorAll(":scope > *");
    children.forEach((child, index) => {
      child.classList.add("scroll-animate");
      
      // Asignar delay dinámico en línea para el escalonamiento (50ms por elemento)
      if (child instanceof HTMLElement) {
        child.style.transitionDelay = `${index * 50}ms`;
      }
      
      observer!.observe(child);
    });
  });
}

export function cleanupAnimations() {
  // Desconectar el observer para evitar fugas de memoria 
  // cuando Astro intercambia páginas (ViewTransitions)
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

export function initAllAnimations() {
  cleanupAnimations();
  setupAnimations();
}