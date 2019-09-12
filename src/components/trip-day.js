import AbstractComponent from './abstract.js';
import {LOCALE, DAY_DATE_FORMAT} from './constants.js';

class TripDay extends AbstractComponent {
  constructor(eventsCount, dayCounter, date) {
    super();
    this._eventsCount = eventsCount;
    this._dayCounter = dayCounter;
    const dayDate = new Date(date);
    this._date = dayDate.toLocaleString(LOCALE, DAY_DATE_FORMAT);
    this._dateTime = dayDate.toISOString();
  }

  getTemplate() {
    return `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._dayCounter}</span>
        <time class="day__date" datetime="${this._dateTime}">${this._date}</time>
      </div>
      <ul class="trip-events__list">
        ${this.getEventSlotTemplates(this._eventsCount)}
      </ul>
    </li>
    `.trim();
  }

  getEventSlotTemplates(slotsCount) {
    const slots = new Array(slotsCount).fill(``).map(() => `<li class="trip-events__item"></li>`);
    return slots.join(``);
  }
}

export default TripDay;
