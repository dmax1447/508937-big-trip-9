import AbstractComponent from './abstract.js';
import {LOCALE, INFO_DATE_FORMAT} from './constants.js';

const MIDDLE_POINT_EMPTY_MARK = `&mdash; ... &mdash;`;

class TripInfo extends AbstractComponent {
  constructor(events) {
    super();
    this._cities = events.reduce((acc, event) => [...acc, event.destinationPoint], []);
    this._totalCost = events.reduce((acc, event) => acc + event.cost, 0);
    this._startDate = events[0].startDate;
    this._endDate = events[events.length - 1].endDate;
  }

  getTemplate() {
    return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${this._cities[0]} ${this._cities.length > 3 ? MIDDLE_POINT_EMPTY_MARK : this._cities[1]} ${this._cities[this._cities.length - 1]}</h1>
      <p class="trip-info__dates">${new Date(this._startDate).toLocaleString(LOCALE, INFO_DATE_FORMAT)} ${new Date(this._startDate).getDate()}&nbsp;&mdash;&nbsp;${new Date(this._endDate).getDate()}</p>
    </div>
    `.trim();
  }
}

export default TripInfo;
