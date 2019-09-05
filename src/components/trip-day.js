import {createElement, render, Position} from './utils.js';
import TripEvent from './trip-event';
import TripEventForm from './trip-event-form.js';

const dateFormatShort = {
  month: `short`,
  day: `2-digit`,
};

class TripDay {
  constructor(events, day) {
    this._events = events;
    this._day = day;
    this._element = null;
    const dayDate = new Date(events[0].startDate);
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

  getElement(formState) {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      const eventsContainer = this._element.querySelector(`.trip-events__list`);
      this._events.forEach((event) => {
        const eventElement = new TripEvent(event).getElement();
        const eventElementForm = new TripEventForm(event).getElement();
        const openBtn = eventElement.querySelector(`.event__rollup-btn`);
        const closeBtn = eventElementForm.querySelector(`.event__rollup-btn`);

        const onBtnOpenFormClick = () => {
          if (formState.isActive) {
            return;
          }
          eventsContainer.replaceChild(eventElementForm, eventElement);
          formState.isActive = true;
        };

        const onBtnCloseFormClick = () => {
          eventsContainer.replaceChild(eventElement, eventElementForm);
          formState.isActive = false;
        };

        openBtn.addEventListener(`click`, onBtnOpenFormClick);
        closeBtn.addEventListener(`click`, onBtnCloseFormClick);
        render(eventsContainer, eventElement, Position.AFTERBEGIN);
      });
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default TripDay;
