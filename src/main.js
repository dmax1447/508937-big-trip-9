
import getTripEventData from './components/event-data';
import Menu from './components/menu.js';
import MainController from './components/main-controller.js';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import {render} from './components/utils.js';
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

const init = () => {
  // готовим исходные данные, массив дней, в каждом дне массив событий
  let idCount = 0;
  const tripEvents = new Array(EVENTS_COUNT).fill(``).map(() => getTripEventData(idCount += 1));

  renderMenu();
  // const tripDaysContainer = renderTripDaysContainer();
  // const tripController = new TripController(tripDaysContainer, tripEvents);
  // tripController.init();
  const mainController = new MainController(tripEvents);
  mainController.init();
};

init();
