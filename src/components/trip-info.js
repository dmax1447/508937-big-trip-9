import AbstractComponent from './abstract.js';
import moment from 'moment';

const MIDDLE_POINT_EMPTY_MARK = `&mdash; ... &mdash;`;

class TripInfo extends AbstractComponent {
  constructor(events) {
    super();
    // распределим события по дням (так как они отображаются по умолчанию (сортировка по events))
    this._events = [...events].sort((a, b) => {
      const dayA = moment(a.startDate).format(`YYYY-MM-DD`);
      const dayB = moment(b.startDate).format(`YYYY-MM-DD`);
      if (dayA === dayB) {
        return 0;
      }
      return dayA > dayB ? 1 : -1;
    });
    this._cities = this._events.reduce((acc, event) => [...acc, event.destinationPoint], []);
    this._totalCost = this._events.reduce((acc, event) => acc + event.cost, 0);
    this._startDate = this._events[0].startDate;
    this._endDate = this._events[events.length - 1].endDate;
  }

  getTemplate() {
    return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${this._cities[0]} ${this._cities.length > 3 ? MIDDLE_POINT_EMPTY_MARK : this._cities[1]} ${this._cities[this._cities.length - 1]}</h1>
      <p class="trip-info__dates">${moment(this._startDate).format(`DD MMM`)} &nbsp;&mdash;&nbsp;${moment(this._endDate).format(`DD MMM`)}</p>
    </div>
    `.trim();
  }
}

export default TripInfo;
