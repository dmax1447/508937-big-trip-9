
import getTripEventData from './components/event-data';
import Menu from './components/menu.js';
import TripInfo from './components/trip-info.js';
import Filter from './components/filter.js';
import TripController from './components/trip-controller.js';

import {render, createElement} from './components/utils.js';
import {Position} from './components/constants.js';


const DAYS_COUNT = 3;
const EVENTS_IN_DAY_COUNT = 4;

/**
 * подготовка и рендер информации о поездке
 * @param {Array} tripDays массив дней с данными
 */
const renderTripInfo = (tripDays) => {
  const tripInfo = new TripInfo(tripDays);
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
  const tripDays = new Array(DAYS_COUNT).fill(``).map(() => new Array(EVENTS_IN_DAY_COUNT).fill(``).map(() => getTripEventData()));
  // рендерим инфу о поездке, меню, фильтр, сортировку, и контейнер для дней путешествия
  renderTripInfo(tripDays);
  renderMenu();
  renderFilter();
  const tripDaysContainer = renderTripDaysContainer();
  const tripController = new TripController(tripDaysContainer, tripDays);
  tripController.init();
};

init();
