/**
   * 1. правильно ли генерировать данные в виде массив дней - в дне массив значений?
   *  - это упростит поиск и обработку данных по событиям
   *  - так же скорее всего с сервера данные будут приходить в виде массива событий
   *  - если пользователь изменит дату события, то событие окажется не в том дне. следовательно дни зависят от событий а не наооброт
   *  - для генерации дат дней можно пройти по массиву событий собрав даты и сделать из них Set
   *  - в дальнейшем в разметку дня просто передавать отфильтрованные по дню события
   * 2. правильный ли метод привязки this для вызова в pointController коллбеков onDataChange, onChangeViev
   * 3. деструктурирующее присваивание объектов, можно ли использовать? event = { ...event, ...data}
   */

import TripDay from './trip-day.js';
import Sort from './sort.js';
import PointController from './point-controller';
import {Position} from './constants.js';
import {render, unrender} from './utils.js';

class TripController {
  constructor(container, tripDays) {
    this._container = container;
    this._tripDays = tripDays;
    this._tripDaysSorted = [];
    this._formState = {isActive: false};
    this._sort = new Sort();
    this._tripDayElements = [];
    this._isFormActive = false;
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  // начальная инициализация
  init() {
    this.initSort();
    this.renderDays(this._tripDays);
  }

  // инициализация сортировки: подвешивание обработчиков
  initSort() {
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    const sortInputs = [...this._sort._element.querySelectorAll(`.trip-sort__input`)];
    const onSortFieldClick = (evt) => {
      const sortBy = evt.target.dataset.sortId;
      this._sort._items.forEach((item) => {
        item.isEnabled = (item.name === sortBy);
      });
      this.sortEvents(sortBy);
    };

    sortInputs.forEach((input) => {
      input.addEventListener(`click`, onSortFieldClick);
    });
  }

  // рендерит в DOM элементы "День" и сохраняет ссылки на них
  renderDays(tripDays) {
    this.unrenderDays();
    for (let i = 0; i < tripDays.length; i++) {
      const tripDay = new TripDay(tripDays[i].length, i + 1, tripDays[i][0].startDate);
      this._tripDayElements.push(tripDay);
      render(this._container, tripDay.getElement(this._formState), Position.BEFOREEND);
      this.renderDayEvents(tripDay._element, tripDays[i]);
    }
  }

  renderDayEvents(container, events) {
    const eventSlots = [...container.querySelectorAll(`.trip-events__item`)];
    eventSlots.forEach((slot, i) => {
      const pointController = new PointController(slot, events[i], this._onDataChange, this._onChangeView);
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


  // сортирует массив данных на месте, и перерендрит дни на основе отсортированных данных
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

    this._tripDaysSorted = JSON.parse(JSON.stringify(this._tripDays));
    this._tripDaysSorted.forEach((dayEvents) => {
      dayEvents.sort((a, b) => {
        return compareEvents(a, b, sortBy);
      });
    });
    this.unrenderDays();
    this.renderDays(sortBy === `event` ? this._tripDays : this._tripDaysSorted);
  }

  // коллбек на изменение данных, вызывается в pointController в контексте tripController
  _onDataChange({type, destinationPoint, description, startDate, endDate, cost, id, offers}) {
    let event = null;
    this._tripDays.forEach((day) => {
      const index = day.findIndex((item) => item.id === id);
      if (index !== -1) {
        event = day[index];
      }
    });
    event.type = type;
    event.destinationPoint = destinationPoint;
    event.startDate = startDate;
    event.description = description;
    event.endDate = endDate;
    event.cost = cost;
    event.offers = offers;
    this.renderDays(this._tripDays);
  }

  _onChangeView(state) {
    this._isFormActive = state.isFormActive;
  }
}

export default TripController;
