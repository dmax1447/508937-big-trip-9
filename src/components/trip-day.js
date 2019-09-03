import {createElement, render, Position} from './utils.js';

const dateFormatShort = {
  month: `short`,
  day: `2-digit`,
};

class TripDay {
  constructor(events, day) {
    this._events = events;
    this._day = day;
    this._element = null;
    const dayDate = new Date(events[0]._startDate);
    this._date = dayDate.toLocaleString(`en-US`, dateFormatShort);
    this._dateTime = dayDate.toISOString();
  }

  getTemplate() {
    return `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._day}</span>
        <time class="day__date" datetime="${this._dateTime}">${this._date}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>
    `.trim();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      const eventsContainer = this._element.querySelector(`.trip-events__list`);
      this._events.forEach((event) => {
        render(eventsContainer, event.getElement(), Position.AFTERBEGIN);
      });
    }
    return this._element;
  }
}

export default TripDay;
