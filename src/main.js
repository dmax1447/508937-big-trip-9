import getTripInfo from '../src/components/trip-info.js';
import getMenu from '../src/components/menu.js';
import getFilters from '../src/components/filters.js';
import getSort from '../src/components/sort.js';
import getTripMarkup from '../src/components/trip-content.js';
import TripEvent from './components/trip-event.js';
import getMenuData from '../src/components/menu-data.js';
import TripInfoData from '../src/components/trip-info.js';
import getFiltersData from '../src/components/filters-data.js';
import getSortData from '../src/components/sort-data.js';
import {render, unrender, Position} from './components/utils.js';


const DAYS_COUNT = 3;
const EVENTS_IN_DAY_COUNT = 4;

const renderContent = (selector, content, position = `beforeend`) => {
  const element = document.querySelector(selector);
  element.insertAdjacentHTML(position, content);
};

const tripInfoContainer = document.querySelector(`.trip-main__trip-info`);

const init = () => {
  // массив дней, в каждом дне массив событий
  const tripDays = new Array(DAYS_COUNT)
    .fill(``)
    .map(
        () => new Array(EVENTS_IN_DAY_COUNT).fill(``).map(() => new TripEvent())
    );
  // инфа о поездке
  const tripInfoData = new TripInfoData(tripDays);
  console.log(tripInfoData.getElement());
  render(tripInfoContainer, tripInfoData.getElement(), Position.AFTERBEGIN);
  // const menuData = getMenuData();
  // const filtersData = getFiltersData();
  // const sortData = getSortData();
  // document.querySelector(`.trip-info__cost-value`).textContent = tripInfoData.totalCost;
  // renderContent(`.trip-main__trip-info`, getTripInfo(tripInfoData), `afterbegin`);
  // renderContent(`.trip-main__trip-controls h2`, getMenu(menuData), `afterend`);
  // renderContent(`.trip-main__trip-controls`, getFilters(filtersData), `beforeend`);
  // renderContent(`.trip-events h2`, getSort(sortData), `afterend`);
  // renderContent(`.trip-events`, getTripMarkup(), `beforeend`);
  // renderContent(`.trip-days`, tripDays, `afterbegin`);
};

init();
