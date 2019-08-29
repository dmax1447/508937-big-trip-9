import getTripInfo from '../src/components/trip-info.js';
import getMenu from '../src/components/menu.js';
import getFilters from '../src/components/filters.js';
import getSort from '../src/components/sort.js';
import getTripMarkup from '../src/components/trip-content.js';
import getTripDay from '../src/components/trip-day.js';
import getTripDayData from '../src/components/data';


const DAYS_COUNT = 3;

const renderContent = (selector, content, position = `beforeend`) => {
  const element = document.querySelector(selector);
  element.insertAdjacentHTML(position, content);
};

const init = () => {
  const tripDaysData = new Array(DAYS_COUNT).fill(``).map(() => getTripDayData());
  const tripDays = tripDaysData.map((tripDayData, i) => getTripDay(tripDayData, i + 1));
  // console.dir(tripDays);
  renderContent(`.trip-main__trip-info`, getTripInfo(), `afterbegin`);
  renderContent(`.trip-main__trip-controls h2`, getMenu(), `afterend`);
  renderContent(`.trip-main__trip-controls`, getFilters(), `beforeend`);
  renderContent(`.trip-events h2`, getSort(), `afterend`);
  renderContent(`.trip-events`, getTripMarkup(), `beforeend`);
  renderContent(`.trip-days`, tripDays, `afterbegin`);

};

init();
