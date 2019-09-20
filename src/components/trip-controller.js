
import Day from './day.js';
import Sort from './sort.js';
import PointController from './point-controller';
import TripEventFormFirst from './trip-event-form-first';
import {Position} from './constants.js';
import {render, unrender} from './utils.js';
import moment from 'moment';


class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._eventsSorted = [];
    this._formState = {isActive: false};
    this._sort = new Sort();
    this._tripDayElements = [];
    this._isFormActive = false;
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
    this._subscriptions = [];
  }

  // начальная инициализация
  init() {
    this.renderSort();
    this.renderDays(this._events, true);
    if (this._events.length === 0) {
      const tripEventFormFirst = new TripEventFormFirst();
      render(this._container, tripEventFormFirst.getElement(), Position.BEFOREEND);
    }
  }

  // рендер сортировки: подвешивание обработчиков
  renderSort() {
    if (this._sort._element) {
      unrender(this._sort);
    }
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    const sortInputs = [...this._sort._element.querySelectorAll(`.trip-sort__input`)];
    const onSortFieldClick = (evt) => {
      const sortBy = evt.target.dataset.sortId;
      this._sort._items.forEach((item) => {
        item.isEnabled = (item.name === sortBy);
      });
      this.renderSort();
      this.sortEvents(sortBy);
    };

    sortInputs.forEach((input) => {
      input.addEventListener(`click`, onSortFieldClick);
    });
  }

  // соберает массив уникальных дат событий
  getEventDays(events) {
    const eventsDays = [];
    events.forEach((event) => {
      const day = moment(event.startDate).format(`YYYY-MM-DD`);
      eventsDays.push(day);
    });
    return [...new Set(eventsDays)].sort();
  }

  // рендерит разметку дней, сортировку, события в дни
  renderDays(events, isDayShow) {
    this.unrenderDays();
    const days = this.getEventDays(events);
    days.forEach((day, i) => {
      const dayEvents = events.filter((event) => moment(event.startDate).format(`YYYY-MM-DD`) === day);
      const tripDay = new Day(dayEvents.length, i + 1, day, isDayShow);
      this._tripDayElements.push(tripDay);
      render(this._container, tripDay.getElement(), Position.BEFOREEND);
      this.renderDayEvents(tripDay._element, dayEvents);
    });

  }

  // рендерит в контейнер "день" события дня
  renderDayEvents(container, events) {
    const eventSlots = [...container.querySelectorAll(`.trip-events__item`)];
    eventSlots.forEach((slot, i) => {
      const pointController = new PointController(slot, events[i], this._onDataChange, this._onChangeView);
      this._subscriptions.push(pointController.setDefaultView);
      pointController.render();
    });
  }

  // удаляет из DOM элементы "День путешествия" и ссылки на них
  unrenderDays() {
    this._tripDayElements.forEach((item) => {
      unrender(item);
    });
    this._tripDayElements = [];
  }


  // сортирует события, и перерендрит дни на основе отсортированных данных
  sortEvents(sortBy) {
    const compareEvents = (a, b, field) => {
      switch (field) {
        case `time`:
          return a.startDate > b.startDate ? 1 : -1;
        case `price`:
          return a.cost > b.cost ? 1 : -1;
        default:
          return 0;
      }
    };

    if (sortBy === `event`) {
      this.renderDays(this._events, true);
    } else {
      this._eventsSorted = JSON.parse(JSON.stringify(this._events));
      this._eventsSorted.sort((a, b) => compareEvents(a, b, sortBy));
      this.renderDays(this._eventsSorted, false);
    }
  }

  // коллбек на изменение данных, вызывается в pointController в контексте tripController
  _onDataChange(newData, eventId) {

    if (newData !== null) {
      const event = this._events.find((item) => item.id === eventId);
      event.type = newData.type;
      event.destinationPoint = newData.destinationPoint;
      event.startDate = newData.startDate;
      event.endDate = newData.endDate;
      event.cost = newData.cost;
      event.offers = newData.offers;
    } else {
      const eventIndex = this._events.findIndex((item) => item.id === eventId);
      console.log(`delete event, index: ${eventIndex}`);
    }


    this.renderDays(this._events, this._sort._items[0].isEnabled);
  }

  // коллбек на открытие формы редактирования (закрывает остальные формы)
  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  // покажет контейнер
  show() {
    this._container.classList.remove(`visually-hidden`);
  }

  // скроет контейнер
  hide() {
    this._container.classList.add(`visually-hidden`);
  }

}

export default TripController;
