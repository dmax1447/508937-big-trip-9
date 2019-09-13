import {Position} from './constants.js';
import {render} from './utils.js';
import TripEvent from './trip-event';
import TripEventForm from './trip-event-form.js';

class PointController {
  constructor(container, event, onDataChange, onChangeView) {
    this._container = container;
    this._event = event;

    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._eventElement = new TripEvent(event).getElement();
    this._eventFormElement = new TripEventForm(event).getElement();
  }

  render() {
    const openBtn = this._eventElement.querySelector(`.event__rollup-btn`);
    const closeBtn = this._eventFormElement.querySelector(`.event__rollup-btn`);

    const onBtnOpenFormClick = () => {
      this._container.replaceChild(this._eventFormElement, this._eventElement);
      document.addEventListener(`keydown`, onEscKeyDown);
      this._onChangeView({isFormActive: true});
    };

    const onBtnCloseFormClick = () => {
      this._container.replaceChild(this._eventElement, this._eventFormElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
      this._onChangeView({isFormActive: false});
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
        startDate: new Date(data.get(`event-start-time`)),
        endDate: new Date(data.get(`event-end-time`)),
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
      this._onChangeView({isFormActive: false});
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(this._eventElement, this._eventFormElement);
      }
      document.removeEventListener(`keydown`, onEscKeyDown);
      this._onChangeView({isFormActive: false});
    };

    openBtn.addEventListener(`click`, onBtnOpenFormClick);
    closeBtn.addEventListener(`click`, onBtnCloseFormClick);
    this._eventFormElement.addEventListener(`submit`, onFormSubmit);
    render(this._container, this._eventElement, Position.BEFOREEND);
  }

}

export default PointController;
