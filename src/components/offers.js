import AbstractComponent from './abstract.js';
import {createElement} from './utils.js';

class Offers extends AbstractComponent {
  constructor() {
    super();
    this.offers = [];
  }

  getTemplate(offers) {
    return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers.map((offer) => this._getOfferTemplate(offer)).join(``).trim()}
      </div>
    </section>
    `.trim();
  }

  // вернет разметку слотов под события
  _getOfferTemplate({name, cost}) {
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}" type="checkbox" name="event-offer" value="${name}">
        <label class="event__offer-label" for="event-offer-${name}">
          <span class="event__offer-title">${name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${cost}</span>
        </label>
      </div>
    `.trim();
  }

  getElement() {
    this._element = createElement(this.getTemplate(this.offers));
    return this._element;
  }
}

export default Offers;
