
import getTripEventData from './components/event-data';
import Menu from './components/menu.js';
import TripInfo from './components/trip-info.js';
import Filter from './components/filter.js';
import Sort from './components/sort.js';
import TripDay from './components/trip-day.js';

import {render, createElement, Position} from './components/utils.js';


const DAYS_COUNT = 3;
const EVENTS_IN_DAY_COUNT = 4;

/**
 * подготовка и рендер информации о поездке
 * @param {Array} tripDays массив дней с данными
 */
const renderTripInfo = (tripDays) => {
  const tripInfoData = new TripInfo(tripDays);
  const tripInfoContainer = document.querySelector(`.trip-main__trip-info`);
  render(tripInfoContainer, tripInfoData.getElement(), Position.AFTERBEGIN);
  document.querySelector(`.trip-info__cost-value`).textContent = tripInfoData._totalCost;
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
 * рендер сортировка
 */
const renderSort = () => {
  const sort = new Sort();
  const tripSortContainer = document.querySelector(`.trip-events`);
  render(tripSortContainer, sort.getElement(), Position.BEFOREEND);
};

/**
 * рендер событий поездки
 * @param {Array} tripDays массив дней с событиями
 */
const renderTripDays = (tripDays) => {
  const tripDaysContainer = createElement(`<ul class="trip-days"></ul>`);
  const tripEventsContainer = document.querySelector(`.trip-events`);
  render(tripEventsContainer, tripDaysContainer, Position.BEFOREEND);
  // рендерим дни с событиями в контейнер
  for (let i = 0; i < tripDays.length; i++) {
    const tripDay = new TripDay(tripDays[i], i + 1);
    render(tripDaysContainer, tripDay.getElement(), Position.BEFOREEND);
  }
};


const init = () => {
  // готовим исходные данные, массив дней, в каждом дне массив событий
  const tripDays = new Array(DAYS_COUNT).fill(``).map(() => new Array(EVENTS_IN_DAY_COUNT).fill(``).map(() => getTripEventData()));
  renderTripInfo(tripDays);
  renderMenu();
  renderFilter();
  renderSort();
  renderTripDays(tripDays);
};

init();
