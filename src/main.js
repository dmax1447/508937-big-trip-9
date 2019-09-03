
import getTripEventData from './components/event-data';
import Menu from './components/menu.js';
import TripInfoData from './components/trip-info.js';
import Filter from './components/filter.js';
import Sort from './components/sort.js';
import TripDay from './components/trip-day.js';

import {render, createElement, Position} from './components/utils.js';


const DAYS_COUNT = 3;
const EVENTS_IN_DAY_COUNT = 4;

// const renderContent = (selector, content, position = `beforeend`) => {
//   const element = document.querySelector(selector);
//   element.insertAdjacentHTML(position, content);
// };


const init = () => {
  // готовим исходные данные, массив дней, в каждом дне массив событий
  const tripDays = new Array(DAYS_COUNT).fill(``).map(() => new Array(EVENTS_IN_DAY_COUNT).fill(``).map(() => getTripEventData()));
  // инфа о поездке
  const tripInfoData = new TripInfoData(tripDays);
  const tripInfoContainer = document.querySelector(`.trip-main__trip-info`);
  render(tripInfoContainer, tripInfoData.getElement(), Position.AFTERBEGIN);
  document.querySelector(`.trip-info__cost-value`).textContent = tripInfoData._totalCost;

  // меню
  const menu = new Menu();
  const menuContainer = document.querySelector(`.trip-main__trip-controls`);
  render(menuContainer, menu.getElement(), Position.BEFOREEND);

  // фильтры
  const filter = new Filter();
  const filterContainer = document.querySelector(`.trip-main__trip-controls`);
  render(filterContainer, filter.getElement(), Position.BEFOREEND);

  // сортировка
  const sort = new Sort();
  const tripEventsContainer = document.querySelector(`.trip-events`);
  render(tripEventsContainer, sort.getElement(), Position.BEFOREEND);

  // добавим контейнер списка дней
  const tripDaysContainer = createElement(`<ul class="trip-days"></ul>`);
  render(tripEventsContainer, tripDaysContainer, Position.BEFOREEND);

  // рендерим дни с событиями в контейнер
  for (let i = 0; i < tripDays.length; i++) {
    const tripDay = new TripDay(tripDays[i], i + 1);
    render(tripDaysContainer, tripDay.getElement(), Position.BEFOREEND);
  }
};

init();
