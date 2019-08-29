import getTripEvent from './event.js';

const getTripDay = ({date, events}, day) => {

  const eventsMarkup = events.map(((event) => getTripEvent(event)));
  const dateFormat = {
    year: `numeric`,
    month: `numeric`,
    day: `numeric`,
  };


  return `
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${day}</span>
      <time class="day__date" datetime="${new Date(date).toLocaleString()}">${new Date(date).toLocaleString(`ru-RU`, dateFormat)}</time>
    </div>

    <ul class="trip-events__list">
      ${eventsMarkup.join(``)}
    </ul>
  </li>
  `;
};

export default getTripDay;
