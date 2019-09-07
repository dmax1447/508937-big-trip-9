import TripDay from './trip-day.js';
import Sort from './sort.js';
import {Position} from './constants.js';
import {render} from './utils.js';

class TripController {
  constructor(container, tripDays) {
    this._container = container;
    this._tripDays = tripDays;
    this._formState = {isActive: false};
    this._sort = new Sort();
    this._activeSort = null;
  }

  init() {
    const tripSortContainer = document.querySelector(`.trip-events`);
    render(tripSortContainer, this._sort.getElement(), Position.AFTERBEGIN);
    const sortInputs = [...document.querySelectorAll(`.trip-sort__input`)];

    const changeActiveSort = (evt) => {
      this._activeSort = evt.target.dataset.sortId;
      this._sort._items.forEach((item) => {
        item.isEnabled = (item.name === this._activeSort);
      });
      console.log(this._sort);
      console.log(this._activeSort);
    };

    sortInputs.forEach((input) => {
      input.addEventListener(`click`, changeActiveSort);
    });

    for (let i = 0; i < this._tripDays.length; i++) {
      const tripDay = new TripDay(this._tripDays[i], i + 1);
      render(this._container, tripDay.getElement(this._formState), Position.BEFOREEND);
    }
  }

  sort() {
    console.log(`sort`);
  }

}

export default TripController;
