import getTripCard from './trip-day-card.js';
import getEventForm from './event-form.js';

const eventForm = getEventForm();

const getTripContent = () => {
  return `
  <ul class="trip-days">
    ${getTripCard(eventForm)}
    ${getTripCard()}
    ${getTripCard()}
  </ul>
  `;
};

export default getTripContent;
