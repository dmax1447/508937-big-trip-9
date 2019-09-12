import AbstractComponent from './abstract.js';
import {createElement, render} from './utils.js';
import {LOCALE, DAY_DATE_FORMAT, Position} from './constants.js';
import TripEvent from './trip-event';
import TripEventForm from './trip-event-form.js';
import TripEventFormFirst from './trip-event-form-first.js';

class TripDay extends AbstractComponent {
  constructor(events, day) {
    super();
    this._events = events;
    this._day = day;
    const dayDate = new Date(events[0].startDate);
    this._date = dayDate.toLocaleString(LOCALE, DAY_DATE_FORMAT);
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
      if (this._events.length === 0 && this._day === 1) {
        const eventElementFormFirst = new TripEventFormFirst().getElement();
        render(eventsContainer, eventElementFormFirst, Position.BEFOREEND);
      }
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
          document.addEventListener(`keydown`, onEscKeyDown);
          formState.isActive = true;
        };

        const onBtnCloseFormClick = () => {
          eventsContainer.replaceChild(eventElement, eventElementForm);
          document.removeEventListener(`keydown`, onEscKeyDown);
          formState.isActive = false;
        };

        const onFormSubmit = (evt) => {
          evt.preventDefault();
          eventsContainer.replaceChild(eventElement, eventElementForm);
          document.removeEventListener(`keydown`, onEscKeyDown);
          formState.isActive = false;
        };

        const onEscKeyDown = (evt) => {
          if (evt.key === `Escape` || evt.key === `Esc`) {
            eventsContainer.replaceChild(eventElement, eventElementForm);
            formState.isActive = false;
          }
          document.removeEventListener(`keydown`, onEscKeyDown);
        };

        openBtn.addEventListener(`click`, onBtnOpenFormClick);
        closeBtn.addEventListener(`click`, onBtnCloseFormClick);
        eventElementForm.addEventListener(`submit`, onFormSubmit);
        render(eventsContainer, eventElement, Position.BEFOREEND);
      });
    }
    return this._element;
  }
}

export default TripDay;
