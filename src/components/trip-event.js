import {MILISECONDS_PER_DAY, MILISECONDS_PER_HOUR, MILISECONDS_PER_MINUTE} from './constants.js';
import {createElement} from './utils.js';

const MOCK_DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];

const MOCK_DESTINATIONS = [`Kolyma`, `Magadan`, `Yakutsk`, `Norilsk`, `Anadyr`, `airport`, `hotel`, `museum`];

const POINT_TYPES = [
  `bus`,
  `check-in`,
  `drive`,
  `flight`,
  `restaurant`,
  `ship`,
  `sightseeing`, `taxi`, `train`, `transport`, `trip`];

const OFFERS = [
  {
    name: `Add luggage`,
    cost: 10,
    isEnabled: Math.random() >= 0.5,
  },
  {
    name: `Switch to comfort`,
    cost: 150,
    isEnabled: Math.random() >= 0.5,
  },
  {
    name: `Add meal`,
    cost: 2,
    isEnabled: Math.random() >= 0.5,
  },
  {
    name: `Choose seats`,
    cost: 9,
    isEnabled: Math.random() >= 0.5,
  },
];

const eventTypeTextMap = new Map([
  [`bus`, `bus to`],
  [`check-in`, `check in`],
  [`drive`, `drive to`],
  [`flight`, `fly to`],
  [`restaurant`, `dinner at`],
  [`ship`, `sail to`],
  [`sightseeing`, `take a look of`],
  [`taxi`, `taxi to`],
  [`train`, `train to`],
  [`transport`, `transport to`],
  [`trip`, `trip to`],
]);


const getRandomElement = (arr) => {
  const randomIndex = Math.round((arr.length - 1) * Math.random());
  return arr[randomIndex];
};

const generateRandomArr = (mokdata, maxLength) => {
  const arrLength = Math.ceil(Math.random() * maxLength);
  const mokArr = [];
  for (let i = 0; i < arrLength; i++) {
    mokArr.push(getRandomElement(mokdata));
  }
  return mokArr;
};

class TripEvent {
  constructor() {
    this._type = getRandomElement(POINT_TYPES);
    this._destinationPoint = getRandomElement(MOCK_DESTINATIONS);
    this._pics = [
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
    ];
    this._description = generateRandomArr(MOCK_DESCRIPTIONS, 4).join(``);
    this._startDate = Date.now() + MILISECONDS_PER_DAY + 3 * MILISECONDS_PER_HOUR;
    this._endDate = Date.now() + MILISECONDS_PER_DAY + 3 * MILISECONDS_PER_HOUR + 2 * MILISECONDS_PER_HOUR * Math.random();
    this._cost = Math.floor(Math.random() * 100);
    this._offers = generateRandomArr(OFFERS, 2);
    this._element = null;
  }

  getTemplate() {
    const LOCALE = `en-US`;
    const TIME_FORMAT = {hour: `2-digit`, minute: `2-digit`};
    const JOIN_SYMBOL = ``;
    const enabledoffers = this._offers.filter((item) => item.isEnabled);
    const duration = this._endDate - this._startDate;
    const duraionHours = Math.floor(duration / MILISECONDS_PER_HOUR);
    const durationMinutes = Math.round((duration - MILISECONDS_PER_HOUR * duraionHours) / MILISECONDS_PER_MINUTE);


    const getOfferTemplate = (offer) => {
      return `
      <li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
      </li>
      `.trim();
    };

    return `
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventTypeTextMap.get(this._type)} ${this._destinationPoint}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${new Date(this._startDate).toLocaleString(LOCALE, TIME_FORMAT)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${new Date(this._endDate).toLocaleString(LOCALE, TIME_FORMAT)}</time>
          </p>
          <p class="event__duration">${duraionHours ? duraionHours + `H` : ``} ${durationMinutes ? durationMinutes + `M` : ``}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._cost}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${enabledoffers.map((offer) => getOfferTemplate(offer)).join(JOIN_SYMBOL)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
    `.trim();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}

export default TripEvent;


