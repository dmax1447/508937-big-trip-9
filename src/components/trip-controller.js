/* eslint-disable no-unused-vars */

import Day from './day.js';
import Sort from './sort.js';
import PointController from './point-controller';
import TripEventFormNew from './trip-event-form-new';
import {Position, EVENT_FORM_DATE_FORMAT} from './constants.js';
import {render, unrender} from './utils.js';
import moment from 'moment';
import flatpickr from 'flatpickr';

class TripController {
  constructor(container, events, onDataChangeMain) {
    this.onDataChangeMain = onDataChangeMain;
    this._container = container;
    this._events = events;
    this._eventsSorted = [];
    this._sort = new Sort();
    this._tripDayElements = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
    this._tripEventFormNew = new TripEventFormNew();
    this._subscriptions = [];
  }

  // начальная инициализация
  init(destinations, offers) {
    this._renderSort();
    this._renderTripEventNewForm();
    this.renderDays(this._events, true, destinations, offers);
  }

  // рендер формы нового события
  _renderTripEventNewForm() {
    const element = this._tripEventFormNew.getElement();
    render(this._container, element, Position.BEFOREEND);
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
      this._onChangeView();
      this._tripEventFormNew.show();
    });

    const onFormSubmit = (evt) => {
      evt.preventDefault();
      const data = new FormData(element);
      const entry = {
        type: data.get(`event-type`),
        destinationPoint: data.get(`event-destination`),
        description: data.get(``),
        startDate: moment(data.get(`event-start-time`), `DD-MM-YY kk-mm`),
        endDate: moment(data.get(`event-end-time`), `DD-MM-YY kk-mm`),
        cost: parseInt(data.get(`event-price`), 10),
        offers: data.getAll(`event-offer`).reduce((acc, offerName) => {
          const offer = acc.find((item) => item.name === offerName);
          offer.isEnabled = true;
          return acc;
        }, [
          {
            name: `Add luggage`,
            cost: 10,
            isEnabled: false,
          },
          {
            name: `Switch to comfort`,
            cost: 150,
            isEnabled: false,
          },
          {
            name: `Add meal`,
            cost: 2,
            isEnabled: false,
          },
          {
            name: `Choose seats`,
            cost: 9,
            isEnabled: false,
          },
        ]),
        isFavorite: data.get(`event-favorite`),
        id: null,
      };
      this._onDataChange(entry, null);
    };
    flatpickr(element.querySelectorAll(`.event__input--time`), EVENT_FORM_DATE_FORMAT);
    element.addEventListener(`submit`, onFormSubmit);
  }

  // рендер сортировки: подвешивание обработчиков
  _renderSort() {
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
      this._renderSort();
      this._sortEvents(sortBy);
    };

    sortInputs.forEach((input) => {
      input.addEventListener(`click`, onSortFieldClick);
    });
  }

  // соберает массив уникальных дат событий
  _getEventDays(events) {
    const eventsDays = [];
    events.forEach((event) => {
      const day = moment(event.startDate).format(`YYYY-MM-DD`);
      eventsDays.push(day);
    });
    return [...new Set(eventsDays)].sort();
  }

  // рендерит разметку дней, сортировку, события в дни
  renderDays(events, isDayShow, offers, destinations) {
    console.log(destinations);
    console.log(offers);
    this._unrenderDays();
    if (this._events.length > 0) {
      this._tripEventFormNew.hide();
    }
    const days = this._getEventDays(events);
    days.forEach((day, i) => {
      const dayEvents = events.filter((event) => moment(event.startDate).format(`YYYY-MM-DD`) === day);
      const tripDay = new Day(dayEvents.length, i + 1, day, isDayShow);
      this._tripDayElements.push(tripDay);
      render(this._container, tripDay.getElement(), Position.BEFOREEND);
      this._renderDayEvents(tripDay._element, dayEvents);
    });

  }

  // рендерит в контейнер "день" события дня
  _renderDayEvents(container, events) {
    const eventSlots = [...container.querySelectorAll(`.trip-events__item`)];
    eventSlots.forEach((slot, i) => {
      const pointController = new PointController(slot, events[i], this._onDataChange, this._onChangeView);
      this._subscriptions.push(pointController.setDefaultView);
      pointController.render();
    });
  }

  // удаляет из DOM элементы "День путешествия" и ссылки на них
  _unrenderDays() {
    this._tripDayElements.forEach((item) => {
      unrender(item);
    });
    this._tripDayElements = [];
  }

  // сортирует события, и перерендрит дни на основе отсортированных данных
  _sortEvents(sortBy) {
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

  // обработка изменений данных
  _onDataChange(newData, oldData) {
    if (newData !== null && oldData !== null) {
      const event = this._events.find((item) => item.id === oldData.id);
      event.type = newData.type;
      event.destinationPoint = newData.destinationPoint;
      event.startDate = newData.startDate;
      event.endDate = newData.endDate;
      event.cost = newData.cost;
      event.offers = newData.offers;
    }

    if (newData === null) {
      const eventIndex = this._events.findIndex((item) => item.id === oldData.id);
      this._events.splice(eventIndex, 1);
    }

    if (oldData === null) {
      newData.pics = [
        `http://picsum.photos/300/150?r=${Math.random()}`,
        `http://picsum.photos/300/150?r=${Math.random()}`,
        `http://picsum.photos/300/150?r=${Math.random()}`,
        `http://picsum.photos/300/150?r=${Math.random()}`,
        `http://picsum.photos/300/150?r=${Math.random()}`,
      ];

      newData.id = this._events[this._events.length - 1].id + 1;
      this._events.push(newData);
    }
    this.onDataChangeMain(this._events);
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
