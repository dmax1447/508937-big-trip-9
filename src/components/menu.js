import AbstractComponent from './abstract.js';

class Menu extends AbstractComponent {
  constructor() {
    super();
    this._items = [{name: `Table`, isActive: true}, {name: `Stats`, isActive: false}];
  }

  getTabTemplate(tab) {
    return `
    <a class="trip-tabs__btn ${tab.isActive ? `trip-tabs__btn--active` : ``} href="#">${tab.name}</a>
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
