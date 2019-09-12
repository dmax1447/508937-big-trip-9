import AbstractComponent from './abstract.js';
import {MILISECONDS_PER_HOUR, MILISECONDS_PER_MINUTE, LOCALE, EVENT_TO_TEXT_MAP, EVENT_TIME_FORMAT} from './constants.js';

class TripEvent extends AbstractComponent {
  constructor({type, destinationPoint, pics, description, startDate, endDate, cost, offers}) {
    super();
    this._type = type;
    this._destinationPoint = destinationPoint;
    this._pics = pics;
    this._description = description;
    this._startDate = startDate;
    this._endDate = endDate;
    this._cost = cost;
    this._offers = offers;
  }

  getOfferTemplate(offer) {
    return `
    <li class="event__offer">
      <span class="event__offer-title">${offer.name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
    </li>
    `.trim();
  }

  getTemplate() {
    const enabledOffers = this._offers.filter((item) => item.isEnabled);
    const duration = this._endDate - this._startDate;
    const duraionHours = Math.floor(duration / MILISECONDS_PER_HOUR);
    const durationMinutes = Math.round((duration - MILISECONDS_PER_HOUR * duraionHours) / MILISECONDS_PER_MINUTE);

    return `
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${EVENT_TO_TEXT_MAP.get(this._type)} ${this._destinationPoint}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${new Date(this._startDate).toLocaleString(LOCALE, EVENT_TIME_FORMAT)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${new Date(this._endDate).toLocaleString(LOCALE, EVENT_TIME_FORMAT)}</time>
          </p>
          <p class="event__duration">${duraionHours ? duraionHours + `H` : ``} ${durationMinutes ? durationMinutes + `M` : ``}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._cost}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${enabledOffers.map((offer) => this.getOfferTemplate(offer)).join(``)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    `.trim();
  }
}

export default TripEvent;


