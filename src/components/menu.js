import AbstractComponent from './abstract.js';

class Menu extends AbstractComponent {
  constructor(menuState) {
    super();
    this._items = menuState;
  }

  getTabTemplate(tab) {
    return `
    <a class="trip-tabs__btn trip-tabs__btn--${tab.name} ${tab.isActive ? `trip-tabs__btn--active` : ``} href="#">${tab.name}</a>
    `.trim();
  }

  getTemplate() {
    return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${this._items.map((item) => this.getTabTemplate(item)).join(``)}
    </nav>
    `.trim();
  }
}

export default Menu;
