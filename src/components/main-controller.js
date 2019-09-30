
import Sort from './sort.js';
import TripController from './trip-controller';
import TripInfo from './trip-info.js';
import Statistics from './statistics.js';
import Filter from './filter.js';
import {Position} from './constants.js';
import {render, unrender, createElement} from './utils.js';
import API from './api.js';
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip/`;
const AUTHORIZATION = `Basic kjhfdKJLfdsf${Math.random()}`;

class MainController {
  constructor(events, destinations, offers) {
    this.api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
    this._events = events;
    this._destinations = destinations;
    this._offers = offers;
    this._sortComponent = new Sort();
    this._filterComponent = new Filter();
    this._tripInfoComponent = new TripInfo(this._events);
    this._statisticsComponent = new Statistics(this._events);
    this._onDataChangeInTripController = this._onDataChangeInTripController.bind(this);
    this._tripController = new TripController(this._renderTripDaysContainer(), {events, destinations, offers}, this._onDataChangeInTripController);
  }

  // начальная инициализация
  init() {
    this._statisticsComponent.render(this._events);
    this._renderTripInfo();
    this._renderFilter();
    this._tripController.init();
    this._initTabSwitch();
  }

  // подготовка контейнера для событий
  _renderTripDaysContainer() {
    const tripEventsContainer = document.querySelector(`.trip-events`);
    const tripDaysContainer = createElement(`<ul class="trip-days"></ul>`);
    render(tripEventsContainer, tripDaysContainer, Position.BEFOREEND);
    return tripDaysContainer;
  }

  // рендер фильтров FUTURE / PAST / EVERYTHING и инициализация обработчиков нажатия на кнопки
  _renderFilter() {
    const filterContainer = document.querySelector(`.trip-main__trip-controls`);
    const element = this._filterComponent.getElement();
    render(filterContainer, element, Position.BEFOREEND);
    const filterInputs = [...element.querySelectorAll(`.trip-filters__filter-input`)];

    const onFilterTabClick = (evt) => {
      const activeFilter = evt.target.value;
      const today = (new Date()).valueOf();
      let eventsFiltered = [];
      switch (activeFilter) {
        case `future`:
          eventsFiltered = this._events.filter((event) => event.startDate > today);
          break;
        case `past`:
          eventsFiltered = this._events.filter((event) => event.startDate < today);
          break;
        default:
          break;
      }
      this._tripController.renderDays(activeFilter === `everything` ? this._events : eventsFiltered, true);
    };

    filterInputs.forEach((input) => input.addEventListener(`click`, onFilterTabClick));
  }

  // рендер информации о поездке
  _renderTripInfo() {
    if (this._tripInfoComponent._element) {
      unrender(this._tripInfoComponent);
    }
    this._tripInfoComponent = new TripInfo(this._events);
    const tripInfoContainer = document.querySelector(`.trip-main__trip-info`);
    render(tripInfoContainer, this._tripInfoComponent.getElement(), Position.AFTERBEGIN);
    document.querySelector(`.trip-info__cost-value`).textContent = this._tripInfoComponent._totalCost;
  }

  // обработка изменений данных
  _onDataChangeInTripController(commit) {
    switch (commit.type) {
      case `create`:
        this.api.createEvent(commit.data)
          .then(() => {
            this.update();
          });
        break;
      case `update`:
        this.api.updateEvent(commit.data)
          .then(() => {
            this.update();
          });
        break;
      case `delete`:
        this.api.deleteEvent(commit.data)
          .then(() => {
            this.update();
          });
        break;

      default:
        break;
    }
  }

  updateEvents(data) {
    this._events = data;
    this._tripController._events = data;
    this._tripInfoComponent._events = data;
    this._statisticsComponent._events = data;
  }

  update() {
    this.api.getEvents()
      .then((events) => {
        this.updateEvents(events);
        this._tripController.renderDays(true);
        this._statisticsComponent.render();
        this._renderTripInfo();
      });
  }

  _initTabSwitch() {
    const onMenuTabClick = (evt) => {
      const tabName = evt.target.innerText;
      switch (tabName) {
        case `Table`:
          this._tripController.show();
          this._statisticsComponent.hide();
          menuBtnTable.classList.add(`trip-tabs__btn--active`);
          menuBtnStats.classList.remove(`trip-tabs__btn--active`);
          break;
        case `Stats`:
          this._tripController.hide();
          this._statisticsComponent.render(this._events);
          this._statisticsComponent.show();
          menuBtnStats.classList.add(`trip-tabs__btn--active`);
          menuBtnTable.classList.remove(`trip-tabs__btn--active`);
          break;
        default:
          break;
      }
    };

    const menuBtnTable = document.querySelector(`.trip-tabs__btn--Table`);
    const menuBtnStats = document.querySelector(`.trip-tabs__btn--Stats`);
    const menuBtns = [menuBtnTable, menuBtnStats];
    menuBtns.forEach((btn) => btn.addEventListener(`click`, onMenuTabClick));
  }
}

export default MainController;
