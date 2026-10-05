document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  const navLinks = [...document.querySelectorAll(".nav-links a")];

  function closeMenu() {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach(link => link.addEventListener("click", closeMenu));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const sections = document.querySelectorAll("main section[id]");
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));

  const accordion = document.querySelector(".accordion-card");
  const accordionButton = document.querySelector(".accordion-toggle");
  const accordionLabel = accordionButton.querySelector("span");

  accordionButton.addEventListener("click", () => {
    const expanded = accordion.classList.toggle("expanded");
    accordionButton.setAttribute("aria-expanded", String(expanded));
    accordionLabel.textContent = expanded ? "−" : "+";
    accordionButton.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        node.textContent = expanded ? " Hide experiences " : " View experiences ";
      }
    });
  });

  const modal = document.getElementById("isascModal");
  const openModal = document.querySelector(".isasc-overview-trigger");
  const closeModal = modal.querySelector(".modal-close");

  function showModal() {
    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeModal.focus();
  }

  function hideModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    openModal.focus();
  }

  openModal.addEventListener("click", showModal);
  closeModal.addEventListener("click", hideModal);

  modal.addEventListener("mousedown", event => {
    if (event.target === modal) hideModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modal.hidden) hideModal();
  });

  // Close mobile navigation when clicking outside it.
  document.addEventListener("click", event => {
    if (window.innerWidth <= 760 &&
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });
});