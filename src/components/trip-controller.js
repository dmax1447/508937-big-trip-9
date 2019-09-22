/* eslint-disable no-unused-vars */

import Day from './day.js';
import Sort from './sort.js';
import PointController from './point-controller';
import TripEventFormNew from './trip-event-form-new';
import TripInfo from './trip-info.js';
import Statistics from './statistics.js';
import Filter from './filter.js';
import {Position, EVENT_FORM_DATE_FORMAT, MILISECONDS_PER_HOUR} from './constants.js';
import {render, unrender} from './utils.js';
import moment from 'moment';
import flatpickr from 'flatpickr';
import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._eventsSorted = [];
    this._formState = {isActive: false};
    this._sort = new Sort();
    this._tripInfo = new TripInfo(events);
    this._statistics = new Statistics(events);
    this._filter = new Filter();
    this._tripDayElements = [];
    this._isFormActive = false;
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
    this._tripEventFormNew = new TripEventFormNew();
    this._subscriptions = [];
  }

  // начальная инициализация
  init() {
    this.renderTripInfo(this._events);
    this.renderSort();
    this.renderTripEventNewForm();
    this.renderDays(this._events, true);
    this.renderStat(this._events);
    this._statistics.hide();
    this.renderFilter();
  }

  renderFilter() {
    const filterContainer = document.querySelector(`.trip-main__trip-controls`);
    const element = this._filter.getElement();
    render(filterContainer, element, Position.BEFOREEND);
    const filterInputs = [...element.querySelectorAll(`.trip-filters__filter-input`)];

    const onFilterTabClick = (evt) => {
      const activeFilter = evt.target.value;
      const today = (new Date()).valueOf();
      let eventsFiltered = [];
      switch (activeFilter) {
        case `future`:
          eventsFiltered = this._events.filter((event) => event.startDate > today);
          break;
        case `past`:
          eventsFiltered = this._events.filter((event) => event.startDate < today);
          break;
        default:
          break;
      }
      this.renderDays(activeFilter === `everything` ? this._events : eventsFiltered, true);
    };

    filterInputs.forEach((input) => input.addEventListener(`click`, onFilterTabClick));
  }

  renderStat(events) {
    if (this._statistics._element) {
      unrender(this._statistics);
    }
    const element = this._statistics.getElement();
    const mainPageContainer = document.querySelector(`main .page-body__container`);
    render(mainPageContainer, element, Position.BEFOREEND);
    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = document.querySelector(`.statistics__chart--time`);

    const moneyStat = {
      fly: 0,
      stay: 0,
      drive: 0,
      look: 0,
      eat: 0,
      ride: 0
    };

    const transportStat = {
      drive: 0,
      ride: 0,
      fly: 0,
      sail: 0,
    };

    const timeStat = {
    };

    events.forEach((event) => {
      timeStat[event.type] = timeStat[event.type] === undefined ?
        Math.round((event.endDate - event.startDate) / MILISECONDS_PER_HOUR) : timeStat[event.type] + Math.round((event.endDate - event.startDate) / MILISECONDS_PER_HOUR);
      if (event.type === `flight`) {
        moneyStat.fly += event.cost;
        transportStat.fly += 1;
      }
      if (event.type === `check-in`) {
        moneyStat.stay += event.cost;
      }
      if (event.type === `drive`) {
        moneyStat.drive += event.cost;
        transportStat.drive += 1;
      }
      if (event.type === `sightseeing`) {
        moneyStat.look += event.cost;
      }
      if (event.type === `restaurant`) {
        moneyStat.eat += event.cost;
      }
      if (event.type === `bus` || event.type === `taxi`) {
        moneyStat.ride += event.cost;
        transportStat.ride += 1;
      }
      if (event.type === `ship`) {
        transportStat.sail += 1;
      }
    });

    const moneyChart = new Chart(moneyCtx, {
      type: `horizontalBar`,
      data: {
        labels: [...Object.keys(moneyStat)],
        datasets: [{
          label: `MONEY`,
          data: [...Object.values(moneyStat)],
          backgroundColor: `white`,
          borderWidth: 0,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            barThickness: 5,
            gridLines: {
              display: false
            },
            ticks: {
              enabled: false,
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              enabled: true,
              fontSize: 18,
            }
          }]
        },
      },
    });

    const transportChart = new Chart(transportCtx, {
      type: `horizontalBar`,
      data: {
        labels: [...Object.keys(transportStat)],
        datasets: [{
          label: `TRANSPORT`,
          data: [...Object.values(transportStat)],
          backgroundColor: `white`,
          borderWidth: 0,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            barThickness: 5,
            gridLines: {
              display: false
            },
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              enabled: true,
              fontSize: 18,
            }
          }]
        }
      },
    });

    const timeChart = new Chart(timeSpendCtx, {
      type: `horizontalBar`,
      data: {
        labels: [...Object.keys(timeStat)],
        datasets: [{
          label: `TIME`,
          data: [...Object.values(timeStat)],
          backgroundColor: `white`,
          borderWidth: 0,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            barThickness: 5,
            gridLines: {
              display: false
            },
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              enabled: true,
              fontSize: 18,
            }
          }]
        }
      },
    });

    const onMenuTabClick = (evt) => {
      const tabName = evt.target.innerText;
      switch (tabName) {
        case `Table`:
          this.show();
          this._statistics.hide();
          menuBtnTable.classList.add(`trip-tabs__btn--active`);
          menuBtnStats.classList.remove(`trip-tabs__btn--active`);
          break;
        case `Stats`:
          this.hide();
          this._statistics.show();
          menuBtnStats.classList.add(`trip-tabs__btn--active`);
          menuBtnTable.classList.remove(`trip-tabs__btn--active`);
          break;
        default:
          break;
      }
    };

    const menuBtnTable = document.querySelector(`.trip-tabs__btn--Table`);
    const menuBtnStats = document.querySelector(`.trip-tabs__btn--Stats`);
    const menuBtns = [menuBtnTable, menuBtnStats];
    menuBtns.forEach((btn) => btn.addEventListener(`click`, onMenuTabClick));
  }

  // рендер информации о поездке
  renderTripEventNewForm() {
    const element = this._tripEventFormNew.getElement();
    render(this._container, element, Position.BEFOREEND);
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
      this._onChangeView();
      this._tripEventFormNew.show();
    });

    const onFormSubmit = (evt) => {
      evt.preventDefault();
      // document.removeEventListener(`keydown`, onEscKeyDown);
      const data = new FormData(element);
      const entry = {
        type: data.get(`event-type`),
        destinationPoint: data.get(`event-destination`),
        description: data.get(``),
        startDate: moment(data.get(`event-start-time`), `DD-MM-YY kk-mm`),
        endDate: moment(data.get(`event-end-time`), `DD-MM-YY kk-mm`),
        cost: parseInt(data.get(`event-price`), 10),
        offers: data.getAll(`event-offer`).reduce((acc, offerName) => {
          const offer = acc.find((item) => item.name === offerName);
          offer.isEnabled = true;
          return acc;
        }, [
          {
            name: `Add luggage`,
            cost: 10,
            isEnabled: false,
          },
          {
            name: `Switch to comfort`,
            cost: 150,
            isEnabled: false,
          },
          {
            name: `Add meal`,
            cost: 2,
            isEnabled: false,
          },
          {
            name: `Choose seats`,
            cost: 9,
            isEnabled: false,
          },
        ]),
        isFavorite: data.get(`event-favorite`),
        id: null,
      };
      this._onDataChange(entry, null);
    };
    flatpickr(element.querySelectorAll(`.event__input--time`), EVENT_FORM_DATE_FORMAT);
    element.addEventListener(`submit`, onFormSubmit);
  }

  renderTripInfo() {
    if (this._tripInfo._element) {
      unrender(this._tripInfo);
    }
    this._tripInfo = new TripInfo(this._events);
    const tripInfoContainer = document.querySelector(`.trip-main__trip-info`);
    render(tripInfoContainer, this._tripInfo.getElement(), Position.AFTERBEGIN);
    document.querySelector(`.trip-info__cost-value`).textContent = this._tripInfo._totalCost;
  }

  // рендер сортировки: подвешивание обработчиков
  renderSort() {
    if (this._sort._element) {
      unrender(this._sort);
    }
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    const sortInputs = [...this._sort._element.querySelectorAll(`.trip-sort__input`)];
    const onSortFieldClick = (evt) => {
      const sortBy = evt.target.dataset.sortId;
      this._sort._items.forEach((item) => {
        item.isEnabled = (item.name === sortBy);
      });
      this.renderSort();
      this.sortEvents(sortBy);
    };

    sortInputs.forEach((input) => {
      input.addEventListener(`click`, onSortFieldClick);
    });
  }

  // соберает массив уникальных дат событий
  getEventDays(events) {
    const eventsDays = [];
    events.forEach((event) => {
      const day = moment(event.startDate).format(`YYYY-MM-DD`);
      eventsDays.push(day);
    });
    return [...new Set(eventsDays)].sort();
  }

  // рендерит разметку дней, сортировку, события в дни
  renderDays(events, isDayShow) {
    this.unrenderDays();
    if (this._events.length > 0) {
      this._tripEventFormNew.hide();
    }
    const days = this.getEventDays(events);
    days.forEach((day, i) => {
      const dayEvents = events.filter((event) => moment(event.startDate).format(`YYYY-MM-DD`) === day);
      const tripDay = new Day(dayEvents.length, i + 1, day, isDayShow);
      this._tripDayElements.push(tripDay);
      render(this._container, tripDay.getElement(), Position.BEFOREEND);
      this.renderDayEvents(tripDay._element, dayEvents);
    });

  }

  // рендерит в контейнер "день" события дня
  renderDayEvents(container, events) {
    const eventSlots = [...container.querySelectorAll(`.trip-events__item`)];
    eventSlots.forEach((slot, i) => {
      const pointController = new PointController(slot, events[i], this._onDataChange, this._onChangeView);
      this._subscriptions.push(pointController.setDefaultView);
      pointController.render();
    });
  }

  // удаляет из DOM элементы "День путешествия" и ссылки на них
  unrenderDays() {
    this._tripDayElements.forEach((item) => {
      unrender(item);
    });
    this._tripDayElements = [];
  }

  // сортирует события, и перерендрит дни на основе отсортированных данных
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

    if (sortBy === `event`) {
      this.renderDays(this._events, true);
    } else {
      this._eventsSorted = JSON.parse(JSON.stringify(this._events));
      this._eventsSorted.sort((a, b) => compareEvents(a, b, sortBy));
      this.renderDays(this._eventsSorted, false);
    }
  }

  // обработка изменений данных
  _onDataChange(newData, oldData) {
    if (newData !== null && oldData !== null) {
      const event = this._events.find((item) => item.id === oldData.id);
      event.type = newData.type;
      event.destinationPoint = newData.destinationPoint;
      event.startDate = newData.startDate;
      event.endDate = newData.endDate;
      event.cost = newData.cost;
      event.offers = newData.offers;
    }

    if (newData === null) {
      const eventIndex = this._events.findIndex((item) => item.id === oldData.id);
      this._events.splice(eventIndex, 1);
    }

    if (oldData === null) {
      newData.pics = [
        `http://picsum.photos/300/150?r=${Math.random()}`,
        `http://picsum.photos/300/150?r=${Math.random()}`,
        `http://picsum.photos/300/150?r=${Math.random()}`,
        `http://picsum.photos/300/150?r=${Math.random()}`,
        `http://picsum.photos/300/150?r=${Math.random()}`,
      ];

      newData.id = this._events[this._events.length - 1].id + 1;
      this._events.push(newData);
    }

    this.renderTripInfo(this.events);
    this.renderDays(this._events, this._sort._items[0].isEnabled);
    this.renderStat(this._events);
  }

  // коллбек на открытие формы редактирования (закрывает остальные формы)
  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  // покажет контейнер
  show() {
    this._container.classList.remove(`visually-hidden`);
  }

  // скроет контейнер
  hide() {
    this._container.classList.add(`visually-hidden`);
  }
}

export default TripController;
