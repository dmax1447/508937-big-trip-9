import {createElement} from './utils.js';
const LOCALE = `en-US`;
const LOCALE_FORMAT = {
  month: `short`,
};
const MIDDLE_POINT_EMPTY_MARK = `&mdash; ... &mdash;`;

class TripInfoData {
  constructor(tripData) {
    this._cities = tripData.reduce((acc, day) => {
      const dayCities = day.reduce((acc2, event) => [...acc2, event._destinationPoint], []);
      return [...acc, ...dayCities];
    }, []);

    this._totalCost = tripData.reduce((acc, day) => {
      const dayCost = day.reduce((acc2, event) => acc2 + event._cost, 0);
      return acc + dayCost;
    }, 0);

    this._startDate = tripData[0][0]._startDate;
    const lastEventIndex = tripData[tripData.length - 1].length - 1;
    this._endDate = tripData[tripData.length - 1][lastEventIndex]._endDate;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${this._cities[0]} ${this._cities.length > 3 ? MIDDLE_POINT_EMPTY_MARK : this._cities[1]} ${this._cities[this._cities.length - 1]}</h1>
      <p class="trip-info__dates">${new Date(this._startDate).toLocaleString(LOCALE, LOCALE_FORMAT)} ${new Date(this._startDate).getDate()}&nbsp;&mdash;&nbsp;${new Date(this._endDate).getDate()}</p>
    </div>
    `.trim();
  }
}

export default TripInfoData;
