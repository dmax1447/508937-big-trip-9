import {Position} from './constants.js';
import {render} from './utils.js';
import TripEvent from './trip-event';
import TripEventForm from './trip-event-form.js';

class PointController {
  constructor(container, event, onDataChange, onChangeView, isFormActive, context) {
    this._container = container;
    this._event = event;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._eventElement = new TripEvent(event).getElement();
    this._eventFormElement = new TripEventForm(event).getElement();
    this._isFormActive = isFormActive;
    this._context = context;
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
        startDate: data.get(`event-start-time`),
        endDate: data.get(`event-end-time`),
        cost: data.get(`event-price`),
        offers: data.get(``),
        id: this._event.id,
      };
      this._onDataChange.call(this._context, entry);
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
