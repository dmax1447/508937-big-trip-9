import AbstractComponent from './abstract.js';
import {createElement} from './utils.js';

class Destination extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate(destination) {
    return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

      <div class="event__photos-container">
          <div class="event__photos-tape">
          ${destination.pictures.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`).join(``).trim()}
          </div>
      </div>
    </section>
    `.trim();
  }

  getElement(destination) {
    this._element = createElement(this.getTemplate(destination));
    return this._element;
  }
}

export default Destination;
