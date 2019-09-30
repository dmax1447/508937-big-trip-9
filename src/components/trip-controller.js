import Day from './day.js';
import Sort from './sort.js';
import PointController from './point-controller';
import TripEventFormNew from './trip-event-form-new';
import {Position, EVENT_FORM_DATE_FORMAT, EVENT_TO_TEXT_MAP} from './constants.js';
import {render, unrender} from './utils.js';
import ModelEventLocal from './model-event-local';
import moment from 'moment';
import flatpickr from 'flatpickr';
import Offers from './offers';

class TripController {
  constructor(container, data, onDataChangeInTripController) {
    this.onDataChangeInTripController = onDataChangeInTripController;
    this._container = container;
    this._events = data.events;
    this._destinations = data.destinations;
    this._offers = data.offers;
    this._eventsSorted = [];
    this._sort = new Sort();
    this._tripDayElements = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
    this._tripEventFormNew = new TripEventFormNew(this._destinations, this._offers);
    this._subscriptions = [];
    this._offersComponent = new Offers();
  }

  // начальная инициализация
  init() {
    this._renderSort();
    this.renderDays(true);
    const addEventBtn = document.querySelector(`.trip-main__event-add-btn`);
    addEventBtn.addEventListener(`click`, () => {
      this._onChangeView();
      this._renderTripEventNewForm();
    });
  }

  // рендер формы нового события
  _renderTripEventNewForm() {
    const formElement = this._tripEventFormNew.getElement();
    render(this._container, formElement, Position.AFTERBEGIN);

    const typeBtns = [...formElement.querySelectorAll(`.event__type-input`)];
    // const addEventBtn = document.querySelector(`.trip-main__event-add-btn`);
    const cancelBtn = formElement.querySelector(`.event__reset-btn`);

    // // показ формы нового события по кнпке добавить новое
    // addEventBtn.addEventListener(`click`, () => {
    //   this._onChangeView();
    //   this._tripEventFormNew.show();
    // });

    // скрытие формы нового события по кнопке cancel нового события
    cancelBtn.addEventListener(`click`, () => {
      unrender(this._tripEventFormNew);
    });

    // обработчик выбора типа события
    const onTypeChange = (evt) => {
      const eventType = evt.target.value;
      if (this._offersComponent._element) {
        unrender(this._offersComponent);
      }
      formElement.querySelector(`.event__type-output`).innerText = EVENT_TO_TEXT_MAP.get(eventType);
      this._offersComponent.offers = (this._offers.find((item) => item.type === eventType)).offers;
      render(formElement, this._offersComponent.getElement(), Position.BEFOREEND);
    };
    typeBtns.forEach((btn) => btn.addEventListener(`click`, onTypeChange));

    // обработчик сохранения данных нового события
    const onFormSubmit = (evt) => {
      evt.preventDefault();
      const formData = new FormData(formElement);
      const offersChecked = formData.getAll(`event-offer`);
      const offers = this._offersComponent.offers.map((offer) => Object.assign({}, offer, {isEnabled: offersChecked.includes(offer.name)}));
      const destinationPoint = formData.get(`event-destination`);
      const destinationData = this._destinations.find((item) => (item.name === destinationPoint));

      const entry = {
        type: formData.get(`event-type`),
        destinationPoint,
        description: destinationData.description,
        pics: destinationData.pictures,
        startDate: moment(formData.get(`event-start-time`), `DD-MM-YY kk-mm`),
        endDate: moment(formData.get(`event-end-time`), `DD-MM-YY kk-mm`),
        cost: parseInt(formData.get(`event-price`), 10),
        offers,
        isFavorite: formData.get(`event-favorite`),
        id: null,
      };
      this._onDataChange(entry, null);
      unrender(this._tripEventFormNew);
    };

    flatpickr(formElement.querySelectorAll(`.event__input--time`), EVENT_FORM_DATE_FORMAT);
    formElement.addEventListener(`submit`, onFormSubmit);
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

  // рендерит разметку дней, события в дни
  renderDays(isDayShow) {
    this._unrenderDays();
    if (this._events.length === 0) {
      this._renderTripEventNewForm();
    }
    if (isDayShow) {
      const days = this._getEventDays(this._events);
      days.forEach((day, i) => {
        const dayEvents = this._events.filter((event) => moment(event.startDate).format(`YYYY-MM-DD`) === day);
        const tripDay = new Day(dayEvents.length, i + 1, day, isDayShow);
        this._tripDayElements.push(tripDay);
        render(this._container, tripDay.getElement(), Position.BEFOREEND);
        this._renderDayEvents(tripDay._element, dayEvents);
      });
    } else {
      const tripDay = new Day(this._events.length, 0, null, isDayShow);
      this._tripDayElements.push(tripDay);
      render(this._container, tripDay.getElement(), Position.BEFOREEND);
      this._renderDayEvents(tripDay._element, this._eventsSorted);
    }
  }

  // рендерит в контейнер "день" события дня
  _renderDayEvents(container, events) {
    const eventSlots = [...container.querySelectorAll(`.trip-events__item`)];
    eventSlots.forEach((slot, i) => {
      const pointController = new PointController(slot, events[i], this._onDataChange, this._onChangeView, this._destinations, this._offers);
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
      this.renderDays(true);
    } else {
      this._eventsSorted = JSON.parse(JSON.stringify(this._events));
      this._eventsSorted.sort((a, b) => compareEvents(a, b, sortBy));
      this.renderDays(false);
    }
  }

  // обработка изменений данных
  _onDataChange(newData, oldData) {
    const commit = {
      type: null,
      data: null
    };

    if (newData !== null && oldData !== null) {
      const event = this._events.find((item) => item.id === oldData.id);
      event.type = newData.type;
      event.destinationPoint = newData.destinationPoint;
      event.startDate = newData.startDate;
      event.endDate = newData.endDate;
      event.cost = newData.cost;
      event.offers = newData.offers;
      event.isFavorite = newData.isFavorite;
      commit.type = `update`;
      commit.data = event;
    }

    if (newData === null) {
      const eventIndex = this._events.findIndex((item) => item.id === oldData.id);
      const deletedEvent = this._events.splice(eventIndex, 1);
      commit.type = `delete`;
      commit.data = deletedEvent[0];
    }

    if (oldData === null) {
      commit.type = `create`;
      commit.data = new ModelEventLocal(newData);
    }
    this.onDataChangeInTripController(commit);
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
