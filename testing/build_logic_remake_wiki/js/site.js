(() => {
  const toggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".top-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const search = document.getElementById("componentSearch");
  const list = document.getElementById("componentList");
  const empty = document.getElementById("emptyState");
  if (search && list && empty) {
    const rows = [...list.querySelectorAll(".component-row")];
    search.addEventListener("input", () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      rows.forEach(row => {
        const match = (row.dataset.search + " " + row.innerText).toLowerCase().includes(query);
        row.hidden = !match;
        if (match) visible++;
      });
      empty.hidden = visible !== 0;
    });
  }
})();