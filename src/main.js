import getTripInfo from '../src/components/trip-info.js';
import getMenu from '../src/components/menu.js';
import getFilters from '../src/components/filters.js';
import getSort from '../src/components/sort.js';
import getTripContent from '../src/components/trip-content.js';
import getTripPoint from '../src/components/data.js';

const renderContent = (selector, content, position = `beforeend`) => {
  const element = document.querySelector(selector);
  element.insertAdjacentHTML(position, content);
};

const init = () => {
  renderContent(`.trip-main__trip-info`, getTripInfo(), `afterbegin`);
  renderContent(`.trip-main__trip-controls h2`, getMenu(), `afterend`);
  renderContent(`.trip-main__trip-controls`, getFilters(), `beforeend`);
  renderContent(`.trip-events h2`, getSort(), `afterend`);
  renderContent(`.trip-events`, getTripContent(), `beforeend`);
  const tripPoint = (getTripPoint());
  console.log(`startDate:${new Date(tripPoint.startDate)}`);
  console.log(`endDate:${new Date(tripPoint._endDate)}`);
};

init();
