import getTripInfo from '../src/components/trip-info.js';
import getMenu from '../src/components/menu.js';
import getFilters from '../src/components/filters.js';
import getSort from '../src/components/sort.js';
import getTripMarkup from '../src/components/trip-content.js';
import getTripDay from '../src/components/trip-day.js';
import getTripDayData from '../src/components/data.js';
import getMenuData from '../src/components/menu-data.js';
import getTripInfoData from '../src/components/trip-info-data.js';
import getFiltersData from '../src/components/filters-data.js';
import getSortData from '../src/components/sort-data.js';


const DAYS_COUNT = 3;

const renderContent = (selector, content, position = `beforeend`) => {
  const element = document.querySelector(selector);
  element.insertAdjacentHTML(position, content);
};

const init = () => {
  const tripDaysData = new Array(DAYS_COUNT).fill(``).map(() => getTripDayData());
  const tripDays = tripDaysData.map((tripDayData, i) => getTripDay(tripDayData, i + 1));
  const menuData = getMenuData();
  const tripInfoData = getTripInfoData(tripDaysData);
  const filtersData = getFiltersData();
  const sortData = getSortData();
  document.querySelector(`.trip-info__cost-value`).textContent = tripInfoData.totalCost;
  renderContent(`.trip-main__trip-info`, getTripInfo(tripInfoData), `afterbegin`);
  renderContent(`.trip-main__trip-controls h2`, getMenu(menuData), `afterend`);
  renderContent(`.trip-main__trip-controls`, getFilters(filtersData), `beforeend`);
  renderContent(`.trip-events h2`, getSort(sortData), `afterend`);
  renderContent(`.trip-events`, getTripMarkup(), `beforeend`);
  renderContent(`.trip-days`, tripDays, `afterbegin`);

};

init();
