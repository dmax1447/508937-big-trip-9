import AbstractComponent from './abstract.js';

class Filter extends AbstractComponent {
  constructor() {
    super();
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
  }

  getFilterItemTemplate(filter) {
    return `
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${filter.isEnabled ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-everything">${filter.name}</label>
    </div>
    `.trim();
  }

  getTemplate() {
    return `
    <form class="trip-filters" action="#" method="get">
      ${this._items.map((item) => this.getFilterItemTemplate(item)).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
    `.trim();
  }
}

export default Filter;
