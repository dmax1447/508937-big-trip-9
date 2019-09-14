import {Position, EVENT_FORM_DATE_FORMAT} from './constants.js';
import {render} from './utils.js';
import TripEvent from './trip-event';
import TripEventForm from './trip-event-form.js';
import flatpickr from 'flatpickr';
import moment from 'moment';

class PointController {
  constructor(container, event, onDataChange, onChangeView) {
    this._container = container;
    this._event = event;

    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._eventElement = new TripEvent(event).getElement();
    this._eventFormElement = new TripEventForm(event).getElement();
    this.setDefaultView = this.setDefaultView.bind(this);
  }

  render() {
    const openBtn = this._eventElement.querySelector(`.event__rollup-btn`);
    const closeBtn = this._eventFormElement.querySelector(`.event__rollup-btn`);

    const onBtnOpenFormClick = () => {
      this._onChangeView();
      this._container.replaceChild(this._eventFormElement, this._eventElement);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const onBtnCloseFormClick = () => {
      this._container.replaceChild(this._eventElement, this._eventFormElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onFormSubmit = (evt) => {
      evt.preventDefault();
      this._container.replaceChild(this._eventElement, this._eventFormElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
      const data = new FormData(this._eventFormElement);
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
        id: this._event.id,
      };
      this._onDataChange(entry);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(this._eventElement, this._eventFormElement);
      }
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    openBtn.addEventListener(`click`, onBtnOpenFormClick);
    closeBtn.addEventListener(`click`, onBtnCloseFormClick);
    this._eventFormElement.addEventListener(`submit`, onFormSubmit);
    render(this._container, this._eventElement, Position.BEFOREEND);
    flatpickr(this._eventFormElement.querySelectorAll(`.event__input--time`), EVENT_FORM_DATE_FORMAT);
  }

  setDefaultView() {
    if (this._container.contains(this._eventFormElement)) {
      this._container.replaceChild(this._eventElement, this._eventFormElement);
    }
  }

}

export default PointController;
