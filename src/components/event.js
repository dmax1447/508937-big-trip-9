const getTripEvent = ({type, destinationPoint, pics, description, startDate, endDate, cost, options}) => {
  const eventTypeTextMap = new Map([
    [`bus`, `bus to`],
    [`check-in`, `check in`],
    [`drive`, `drive to`],
    [`flight`, `fly to`],
    [`restaurant`, `dinner at`],
    [`ship`, `sail to`],
    [`sightseeing`, `take a look of`],
    [`taxi`, `taxi to`],
    [`train`, `train to`],
    [`transport`, `transport to`],
    [`trip`, `trip to`],
  ]);

  const timeFormat = {hour: `2-digit`, minute: `2-digit`};


  return `
  <li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventTypeTextMap.get(type)} ${destinationPoint}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${new Date(startDate).toLocaleString(`ru-RU`, timeFormat)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${new Date(endDate).toLocaleString(`ru-RU`, timeFormat)}</time>
        </p>
        <p class="event__duration">1H 30M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${cost}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">20</span>
          </li>
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `;
};

export default getTripEvent;
