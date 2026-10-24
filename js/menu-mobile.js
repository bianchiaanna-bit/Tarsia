(() => {
  document.querySelectorAll(".nav-home-tarsia").forEach((nav) => {
    const button = nav.querySelector(".menu-hamburger");
    const menu = nav.querySelector(".menu-mobile");
    if (!button || !menu) return;

    const closeMenu = () => {
      nav.classList.remove("menu-aperto");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Apri il menu");
    };

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = nav.classList.toggle("menu-aperto");
      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute("aria-label", isOpen ? "Chiudi il menu" : "Apri il menu");
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  });
})();
