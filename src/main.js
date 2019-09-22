
import getTripEventData from './components/event-data';
import Menu from './components/menu.js';
import TripController from './components/trip-controller.js';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import {render, createElement} from './components/utils.js';
import {Position} from './components/constants.js';

const EVENTS_COUNT = 12;

/**
 * Рендер меню
 */
const renderMenu = () => {
  const menu = new Menu([{name: `Table`, isActive: true}, {name: `Stats`, isActive: false}]);
  const menuContainer = document.querySelector(`.trip-main__trip-controls`);
  render(menuContainer, menu.getElement(), Position.BEFOREEND);
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

  renderMenu();
  const tripDaysContainer = renderTripDaysContainer();
  const tripController = new TripController(tripDaysContainer, tripEvents);
  tripController.init();
};

init();
