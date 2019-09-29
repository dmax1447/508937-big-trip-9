
import Menu from './components/menu.js';
import MainController from './components/main-controller.js';
import API from './components/api.js';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import {render} from './components/utils.js';
import {Position} from './components/constants.js';

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

  const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
  renderMenu();
  const events = await api.getEvents();
  const destinations = await api.getDestinations();
  const offers = await api.getOffers();
  const mainController = new MainController(events, destinations, offers);
  mainController.init();
};

init();

