import {createElement} from './utils.js';
const JOIN_SYMBOL = ``;


const getFilterItemTemplate = (filter) => {
  return `
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${filter.isEnabled ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-everything">${filter.name}</label>
  </div>
  `;
};

class Filter {
  constructor() {
    this._items = [
      {
        name: `everything`,
        isEnabled: true,
      },
      {
        name: `future`,
        isEnabled: false,
      },
      {
        name: `past`,
        isEnabled: false,
      },
    ];
    this._element = null;
  }

  getTemplate() {
    return `
    <form class="trip-filters" action="#" method="get">
      ${this._items.map((item) => getFilterItemTemplate(item)).join(JOIN_SYMBOL)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
    `.trim();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
}

export default Filter;
