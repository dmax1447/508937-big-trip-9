
import getTripEventData from './components/event-data';
import Menu from './components/menu.js';
import TripInfo from './components/trip-info.js';
import Filter from './components/filter.js';
import TripController from './components/trip-controller.js';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import {render, createElement} from './components/utils.js';
import {Position} from './components/constants.js';

const EVENTS_COUNT = 12;

/**
 * подготовка и рендер информации о поездке
 * @param {Array} events массив событий
 */
const renderTripInfo = (events) => {
  const tripInfo = new TripInfo(events);
  const tripInfoContainer = document.querySelector(`.trip-main__trip-info`);
  render(tripInfoContainer, tripInfo.getElement(), Position.AFTERBEGIN);
  document.querySelector(`.trip-info__cost-value`).textContent = tripInfo._totalCost;
};

/**
 * Рендер меню
 */
const renderMenu = () => {
  const menu = new Menu();
  const menuContainer = document.querySelector(`.trip-main__trip-controls`);
  render(menuContainer, menu.getElement(), Position.BEFOREEND);
};

/**
 * Рендер блока фильтров
 */
const renderFilter = () => {
  const filter = new Filter();
  const filterContainer = document.querySelector(`.trip-main__trip-controls`);
  render(filterContainer, filter.getElement(), Position.BEFOREEND);
};

/**
 * рендер контейнера для дней с событиями
 * @return {node} контейнер для дней c событиями
 */
const renderTripDaysContainer = () => {
  const tripEventsContainer = document.querySelector(`.trip-events`);
  const tripDaysContainer = createElement(`<ul class="trip-days"></ul>`);
  render(tripEventsContainer, tripDaysContainer, Position.BEFOREEND);
  return tripDaysContainer;
};

const init = () => {
  // готовим исходные данные, массив дней, в каждом дне массив событий
  let idCount = 0;
  const tripEvents = new Array(EVENTS_COUNT).fill(``).map(() => getTripEventData(idCount += 1));

  // рендерим инфу о поездке, меню, фильтр, сортировку, и контейнер для дней путешествия
  if (tripEvents.length > 0) {
    renderTripInfo(tripEvents);
  }
  renderMenu();
  renderFilter();
  const tripDaysContainer = renderTripDaysContainer();
  const tripController = new TripController(tripDaysContainer, tripEvents);
  tripController.init();
};

init();
