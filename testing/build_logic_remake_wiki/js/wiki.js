const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
menuToggle?.addEventListener('click', () => {
  const open = sidebar?.classList.toggle('open') ?? false;
  menuToggle.setAttribute('aria-expanded', String(open));
});

const railMenu = document.getElementById('railMenu');
railMenu?.addEventListener('click', () => document.body.classList.toggle('rail-expanded'));

const search = document.getElementById('searchInput');
const cards = [...document.querySelectorAll('.category-card')];
const noResults = document.getElementById('noResults');
function filterCategories() {
  const query = (search?.value || '').trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const matches = !query || `${card.textContent} ${card.dataset.search || ''}`.toLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) visible++;
  });
  if (noResults) noResults.hidden = visible !== 0;
}
search?.addEventListener('input', filterCategories);
document.addEventListener('keydown', event => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
    event.preventDefault(); search?.focus();
  }
  if (event.key === 'Escape' && document.activeElement === search) {
    search.value = ''; filterCategories(); search.blur();
  }
});
