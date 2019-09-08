import TripDay from './trip-day.js';
import Sort from './sort.js';
import {Position} from './constants.js';
import {render, unrender} from './utils.js';

class TripController {
  constructor(container, tripDays) {
    this._container = container;
    this._tripDays = tripDays;
    this._tripDaysSorted = JSON.parse(JSON.stringify(this._tripDays));
    this._formState = {isActive: false};
    this._sort = new Sort();
    this._tripDayElements = [];
  }

  // начальная инициализация
  init() {
    this.initSort();
    this.renderDays(this._tripDays);
  }

  // инициализация сортировки: подвешивание обработчиков
  initSort() {
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    const sortInputs = [...this._sort._element.querySelectorAll(`.trip-sort__input`)];
    const onSortFieldClick = (evt) => {
      const sortBy = evt.target.dataset.sortId;
      this._sort._items.forEach((item) => {
        item.isEnabled = (item.name === sortBy);
      });
      this.sortEvents(sortBy);
    };

    sortInputs.forEach((input) => {
      input.addEventListener(`click`, onSortFieldClick);
    });
  }

  // рендерит в DOM элементы "День" и сохраняет ссылки на них
  renderDays(tripDays) {
    for (let i = 0; i < tripDays.length; i++) {
      const tripDay = new TripDay(tripDays[i], i + 1);
      this._tripDayElements.push(tripDay);
      render(this._container, tripDay.getElement(this._formState), Position.BEFOREEND);
    }
  }

  // удаляет из DOM элементы "День путешествия" и ссылки на них
  unrenderDays() {
    this._tripDayElements.forEach((item) => {
      unrender(item);
    });
    this._tripDayElements = [];
  }


  // сортирует массив данных на месте, и перерендрит дни на основе отсортированных данных
  sortEvents(sortBy) {
    const compareEvents = (a, b, field) => {
      switch (field) {
        case `time`:
          return a.startDate > b.startDate ? 1 : -1;
        case `price`:
          return a.cost > b.cost ? 1 : -1;
        default:
          return 0;
      }
    };

    this._tripDaysSorted.forEach((dayEvents) => {
      dayEvents.sort((a, b) => {
        return compareEvents(a, b, sortBy);
      });
    });
    this.unrenderDays();
    this.renderDays(sortBy === `event` ? this._tripDays : this._tripDaysSorted);
  }
}

export default TripController;
