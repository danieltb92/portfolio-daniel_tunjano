import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupAnimations() {
  gsap.registerPlugin(ScrollTrigger);
}

export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.killTweensOf("*");
}

export function refreshScrollTrigger() {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);
}

export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".scroll-animate");
  
  animatedElements.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => el.classList.add("is-visible"),
      onLeaveBack: () => el.classList.remove("is-visible"),
    });
  });
}

export function initScrollAnimationsLeft() {
  const animatedElements = document.querySelectorAll(".scroll-animate-left");
  
  animatedElements.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => el.classList.add("is-visible"),
      onLeaveBack: () => el.classList.remove("is-visible"),
    });
  });
}

export function initScrollAnimationsRight() {
  const animatedElements = document.querySelectorAll(".scroll-animate-right");
  
  animatedElements.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => el.classList.add("is-visible"),
      onLeaveBack: () => el.classList.remove("is-visible"),
    });
  });
}

export function initScrollAnimationsScale() {
  const animatedElements = document.querySelectorAll(".scroll-animate-scale");
  
  animatedElements.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => el.classList.add("is-visible"),
      onLeaveBack: () => el.classList.remove("is-visible"),
    });
  });
}

export function initStaggerAnimations() {
  const animatedContainers = document.querySelectorAll(".scroll-animate-stagger");
  
  animatedContainers.forEach((container) => {
    const children = container.querySelectorAll(":scope > *");
    
    children.forEach((child, index) => {
      child.classList.add("scroll-animate");
      child.style.transitionDelay = `${index * 50}ms`;
      
      ScrollTrigger.create({
        trigger: child,
        start: "top 85%",
        onEnter: () => child.classList.add("is-visible"),
        onLeaveBack: () => child.classList.remove("is-visible"),
      });
    });
  });
}

export function safetyNet() {
  setTimeout(() => {
    const potentialAnimatedElements = document.querySelectorAll(
      "header, footer, section, main > div, article, .grid, h1, h2, h3, h4, h5, h6, p, a, button, .card, .project-card, .cta-section"
    );
    
    potentialAnimatedElements.forEach(el => {
      const style = getComputedStyle(el);
      const isInvisible = style.opacity === "0" || style.visibility === "hidden" || style.display === "none";
      const hasContent = el.innerHTML.trim().length > 0;
      const rect = el.getBoundingClientRect();
      const isNearViewport = rect.top < 2000 && rect.top > -1000;
      
      if (isInvisible && hasContent && isNearViewport) {
        console.warn("GSAP Safety Net: forcing visibility on:", el.tagName, el.className);
        gsap.set(el, { clearProps: "opacity,visibility" });
        gsap.to(el, { opacity: 1, visibility: "visible", duration: 0.1 });
      }
    });
    ScrollTrigger.refresh();
  }, 1500);
}

export function initAllAnimations() {
  refreshScrollTrigger();
  initScrollAnimations();
  initScrollAnimationsLeft();
  initScrollAnimationsRight();
  initScrollAnimationsScale();
  initStaggerAnimations();
  safetyNet();
}

export { gsap, ScrollTrigger };