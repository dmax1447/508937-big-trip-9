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
      render(this._container, tripDay.getElement(this._formState), Position.BEFOREEND);
    }
  }

  sort(sortBy) {
    console.log(sortBy);
    console.log(this._tripDays);
    // this._tripDays.forEach((dayEvents) => {
    //   dayEvents.sort((a, b) => {
    //     return 1;
    //   });
    // });

  }

}

export default TripController;
