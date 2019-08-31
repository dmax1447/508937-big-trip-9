const getTab = (tab) => `<a class="trip-tabs__btn ${tab.isActive ? `trip-tabs__btn--active` : ``} href="#">${tab.name}</a>`;

const getMenu = (tabsData) => {
  return `
  <nav class="trip-controls__trip-tabs  trip-tabs">
    ${tabsData.map((item) => getTab(item)).join(``)}
  </nav>
  `;
};

export default getMenu;
