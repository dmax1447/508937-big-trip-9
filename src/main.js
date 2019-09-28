
import getTripEventData from './components/event-data';
import Menu from './components/menu.js';
import MainController from './components/main-controller.js';
import API from './components/api.js';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import {render} from './components/utils.js';
import {Position} from './components/constants.js';

const EVENTS_COUNT = 12;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip/`;
const AUTHORIZATION = `Basic kjhfdKJLfdsf${Math.random()}`;

/**
 * Рендер меню
 */
const renderMenu = () => {
  const menu = new Menu([{name: `Table`, isActive: true}, {name: `Stats`, isActive: false}]);
  const menuContainer = document.querySelector(`.trip-main__trip-controls`);
  render(menuContainer, menu.getElement(), Position.BEFOREEND);
};


const init = async () => {
  // mock data generate
  // let idCount = 0;
  // const tripEvents = new Array(EVENTS_COUNT).fill(``).map(() => getTripEventData(idCount += 1));
  const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
  renderMenu();
  const events = await api.getEvents();
  const destinations = await api.getDestinations();
  const offers = await api.getOffers();
  // console.dir(events);
  // console.dir(offers);
  const mainController = new MainController(events, destinations, offers);
  mainController.init();
};

init();

