import AbstractComponent from './abstract.js';
import {LOCALE, INFO_DATE_FORMAT} from './constants.js';

const MIDDLE_POINT_EMPTY_MARK = `&mdash; ... &mdash;`;

class TripInfo extends AbstractComponent {
  constructor(tripData) {
    super();
    this._cities = tripData.reduce((acc, day) => {
      const dayCities = day.reduce((acc2, event) => [...acc2, event.destinationPoint], []);
      return [...acc, ...dayCities];
    }, []);

    this._totalCost = tripData.reduce((acc, day) => {
      const dayCost = day.reduce((acc2, event) => acc2 + event.cost, 0);
      return acc + dayCost;
    }, 0);

    this._startDate = tripData[0][0].startDate;
    const lastEventIndex = tripData[tripData.length - 1].length - 1;
    this._endDate = tripData[tripData.length - 1][lastEventIndex].endDate;
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
