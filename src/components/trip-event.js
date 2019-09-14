import AbstractComponent from './abstract.js';
import moment from 'moment';
import {MILISECONDS_PER_HOUR, MILISECONDS_PER_MINUTE, EVENT_TO_TEXT_MAP, MILISECONDS_PER_DAY} from './constants.js';

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

  _getDuration() {
    const duration = this._endDate - this._startDate;
    const durationDays = Math.floor(duration / MILISECONDS_PER_DAY);
    const durationHours = Math.floor((duration - durationDays * MILISECONDS_PER_DAY) / MILISECONDS_PER_HOUR);
    const durationMinutes = Math.round((duration - durationDays * MILISECONDS_PER_DAY - durationHours * MILISECONDS_PER_HOUR) / MILISECONDS_PER_MINUTE);
    const daysStr = durationDays ? `${durationDays}D` : ``;
    const hoursStr = durationHours ? `${durationHours}H` : ``;
    const minutesStr = durationMinutes ? `${durationMinutes}M` : ``;
    return `${daysStr} ${hoursStr} ${minutesStr}`;
  }

  getTemplate() {
    const enabledOffers = this._offers.filter((item) => item.isEnabled);

    return `
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${EVENT_TO_TEXT_MAP.get(this._type)} ${this._destinationPoint}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${moment(this._startDate).format(`kk:mm`)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${moment(this._endDate).format(`kk:mm`)}</time>
          </p>
          <p class="event__duration">${this._getDuration()}</p>
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


