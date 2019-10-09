import AbstractComponent from './abstract.js';
import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import {render, unrender} from './utils.js';
import {MILISECONDS_PER_HOUR, Position} from './constants.js';

class Statistics extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return `
    <section class="statistics visually-hidden">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>
    `.trim();
  }

  render() {
  /* eslint-disable no-unused-vars */

    if (this._element) {
      unrender(this);
    }
    const element = this.getElement();
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


  }
}

export default Statistics;
