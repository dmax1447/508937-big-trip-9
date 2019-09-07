import TripDay from './trip-day.js';
import {Position} from './constants.js';
import {render} from './utils.js';

class TripController {
  constructor(container, tripDays) {
    this._container = container;
    this._tripDays = tripDays;
    this._formState = {isActive: false};
  }

  init() {
    for (let i = 0; i < this._tripDays.length; i++) {
      const tripDay = new TripDay(this._tripDays[i], i + 1);
      render(this._container, tripDay.getElement(this._formState), Position.BEFOREEND);
    }
  }

}

export default TripController;
