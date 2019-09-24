/* eslint-disable no-unused-vars */

import Sort from './sort.js';
import TripController from './trip-controller';
import TripInfo from './trip-info.js';
import Statistics from './statistics.js';
import Filter from './filter.js';
import {Position, EVENT_FORM_DATE_FORMAT, MILISECONDS_PER_HOUR} from './constants.js';
import {render, unrender, createElement} from './utils.js';
import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

class MainController {
  constructor(events) {
    this._events = events;
    this._sort = new Sort();
    this._filter = new Filter();
    this._tripInfo = new TripInfo(events);
    this._statistics = new Statistics(events);
    this._onDataChangeInTripController = this._onDataChangeInTripController.bind(this);
    this._tripController = new TripController(this._renderTripDaysContainer(), events, this._onDataChangeInTripController);
  }

  // начальная инициализация
  init() {
    // this.renderSort();
    // this.renderFilter();
    this._renderStat();
    this._statistics.hide();
    this._renderTripInfo();
    this._tripController.init();
  }

  _renderTripDaysContainer() {
    const tripEventsContainer = document.querySelector(`.trip-events`);
    const tripDaysContainer = createElement(`<ul class="trip-days"></ul>`);
    render(tripEventsContainer, tripDaysContainer, Position.BEFOREEND);
    return tripDaysContainer;
  }

  // рендер фильтров FUTURE / PAST / EVERYTHING и инициализация обработчиков нажатия на кнопки
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

  // рендер статистики
  _renderStat() {
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

    this._events.forEach((event) => {
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
          this._tripController.show();
          this._statistics.hide();
          menuBtnTable.classList.add(`trip-tabs__btn--active`);
          menuBtnStats.classList.remove(`trip-tabs__btn--active`);
          break;
        case `Stats`:
          this._tripController.hide();
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
  _renderTripInfo() {
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

  // обработка изменений данных
  _onDataChangeInTripController(data) {
    this._events = data;
    this._renderTripInfo();
    this._renderStat();
  }
}

export default MainController;
