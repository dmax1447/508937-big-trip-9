import getTripEvent from './event.js';
import getTripEventForm from './event-form.js';

const getTripDay = ({events}, day) => {

  const eventsMarkup = events.map(((event, i) => (day === 1 && i === 0) ? getTripEventForm(event) : getTripEvent(event)));
  const dateFormat = {
    month: `short`,
    day: `2-digit`,
  };

  return `
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${day}</span>
      <time class="day__date" datetime="${new Date(events[0].startDate).toLocaleString()}">${new Date(events[0].startDate).toLocaleString(`ru-RU`, dateFormat)}</time>
    </div>

    <ul class="trip-events__list">
      ${eventsMarkup.join(``)}
    </ul>
  </li>
  `;
};

export default getTripDay;
