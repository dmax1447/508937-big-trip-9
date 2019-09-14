import AbstractComponent from './abstract.js';
import moment from 'moment';

class TripDay extends AbstractComponent {
  constructor(eventsCount, dayCounter, date, isDayShow) {
    super();
    this._eventsCount = eventsCount;
    this._dayCounter = dayCounter;
    this._date = moment(date).format(`DD MMM`);
    this._isDayShow = isDayShow;
    this._dateTime = moment(date).format(`YYYY-MM-DD`);
  }

  getTemplate() {

    return `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._isDayShow ? this._dayCounter : ``}</span>
        <time class="day__date" datetime="${this._dateTime}">${this._isDayShow ? this._date : ``}</time>
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
