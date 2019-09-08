import TripDay from './trip-day.js';
import Sort from './sort.js';
import {Position} from './constants.js';
import {render, unrender} from './utils.js';

class TripController {
  constructor(container, tripDays) {
    this._container = container;
    this._tripDays = tripDays;
    this._formState = {isActive: false};
    this._sort = new Sort();
    this._tripDayElements = [];
  }

  init() {
    const tripSortContainer = document.querySelector(`.trip-events`);
    render(tripSortContainer, this._sort.getElement(), Position.AFTERBEGIN);
    const sortInputs = [...document.querySelectorAll(`.trip-sort__input`)];

    const onSortFieldClick = (evt) => {
      const sortBy = evt.target.dataset.sortId;
      this._sort._items.forEach((item) => {
        item.isEnabled = (item.name === sortBy);
      });
      this.sort(sortBy);
    };

    sortInputs.forEach((input) => {
      input.addEventListener(`click`, onSortFieldClick);
    });

    for (let i = 0; i < this._tripDays.length; i++) {
      const tripDay = new TripDay(this._tripDays[i], i + 1);
      this._tripDayElements.push(tripDay);
      render(this._container, tripDay.getElement(this._formState), Position.BEFOREEND);
    }
  }

  sort(sortBy) {
    const compare = (a, b, field) => {
      switch (field) {
        case `event`:
          return a.destinationPoint > b.destinationPoint ? 1 : -1;
        case `time`:
          return a.time > b.time ? 1 : -1;
        case `price`:
          return a.cost > b.cost ? 1 : -1;
        default:
          break;
      }
      return 0;
    };

    this._tripDays.forEach((dayEvents) => {
      dayEvents.sort((a, b) => {
        return compare(a, b, sortBy);
      });
    });

    this._tripDayElements.forEach((item) => {
      unrender(item);
    });
    this._tripDayElements = [];

    for (let i = 0; i < this._tripDays.length; i++) {
      const tripDay = new TripDay(this._tripDays[i], i + 1);
      this._tripDayElements.push(tripDay);
      render(this._container, tripDay.getElement(this._formState), Position.BEFOREEND);
    }
  }
}

export default TripController;
