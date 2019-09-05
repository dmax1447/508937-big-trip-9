import {createElement} from './utils.js';

const getTab = (tab) => `<a class="trip-tabs__btn ${tab.isActive ? `trip-tabs__btn--active` : ``} href="#">${tab.name}</a>`;

class Menu {
  constructor() {
    this._items = [{name: `Table`, isActive: true}, {name: `Stats`, isActive: false}];
    this._element = null;
  }

  getTemplate() {
    return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${this._items.map((item) => getTab(item)).join(``)}
    </nav>
    `.trim();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Menu;
