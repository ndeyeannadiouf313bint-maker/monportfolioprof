/* ==========================================================================
   Portfolio — Ndeye Anna Diouf — script.js
   Menu mobile, révélation au scroll, formulaire de contact, retour en haut
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Année dynamique dans le footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Révélation au scroll ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------- Mise en avant du lien de nav actif ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const link = document.querySelector(`.main-nav a[href="#${id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("is-active"));
            link.classList.add("is-active");
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ---------- Formulaire de contact (validation + retour visuel) ---------- */
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (contactForm && formNote) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      formNote.classList.remove("success");

      if (!name || !email || !message) {
        formNote.textContent = "Merci de renseigner votre nom, votre e-mail et votre message.";
        return;
      }
      if (!emailPattern.test(email)) {
        formNote.textContent = "Merci de saisir une adresse e-mail valide.";
        return;
      }

      // Aucun back-end n'est branché ici : à connecter à votre service d'envoi
      // (ex. Formspree, endpoint API, ou mailto) selon vos besoins.
      formNote.textContent = `Merci ${name.split(" ")[0]}, votre message a bien été enregistré. Je vous recontacte rapidement.`;
      formNote.classList.add("success");
      contactForm.reset();
    });
  }

  /* ---------- Retour en haut de page ---------- */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Ombre du header au scroll ---------- */
  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 12 ? "0 8px 24px -18px rgba(11,37,69,.5)" : "none";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
});