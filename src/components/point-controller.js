import {
  Position,
  EVENT_FORM_DATE_FORMAT,
  EVENT_TO_TEXT_MAP
} from './constants.js';
import {render} from './utils.js';
import TripEvent from './trip-event';
import TripEventForm from './trip-event-form.js';
import flatpickr from 'flatpickr';
import moment from 'moment';
import Offers from './offers';
import Destination from './destination.js';

class PointController {
  constructor(container, event, onDataChange, onChangeView, destinations, offers) {
    this._container = container;
    this._event = event;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._eventElement = new TripEvent(event).getElement();
    this._eventFormElement = new TripEventForm(event, destinations, offers).getElement();
    this.setDefaultView = this.setDefaultView.bind(this);
    this._offersComponent = new Offers();
    this._destinationComponent = new Destination();
    this._offers = offers;
    this._destinations = destinations;
  }

  // рендер события
  render() {
    const openBtn = this._eventElement.querySelector(`.event__rollup-btn`);
    const closeBtn = this._eventFormElement.querySelector(`.event__rollup-btn`);
    const deleteBtn = this._eventFormElement.querySelector(`.event__reset-btn`);
    const saveBtn = this._eventFormElement.querySelector(`.event__save-btn`);
    const destinationInput = this._eventFormElement.querySelector(`.event__input--destination`);
    const eventDetailsContainer = this._eventFormElement.querySelector(`.event__details`);

    // клик по кнопке открыть
    const onBtnOpenFormClick = () => {
      this._onChangeView(); // зовем метод в TripController закрываем все остальные открытые формы
      this._container.replaceChild(this._eventFormElement, this._eventElement);
      document.addEventListener(`keydown`, onEscKeyDown);
    };
    openBtn.addEventListener(`click`, onBtnOpenFormClick);


    // закрытие формы
    const onBtnCloseFormClick = () => {
      this._container.replaceChild(this._eventElement, this._eventFormElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    closeBtn.addEventListener(`click`, onBtnCloseFormClick);


    // смена типа события
    const onTypeChange = (evt) => {
      this._eventFormElement.querySelector(`.event__type-output`).innerText = EVENT_TO_TEXT_MAP.get(evt.target.value);
      this._offersComponent.offers = (this._offers.find((item) => item.type === evt.target.value)).offers;
      const offersOld = this._eventFormElement.querySelector(`.event__section--offers`);
      const offersNew = this._offersComponent.getElement();
      eventDetailsContainer.replaceChild(offersNew, offersOld);
    };
    const typeBtns = [...this._eventFormElement.querySelectorAll(`.event__type-input`)];
    typeBtns.forEach((btn) => btn.addEventListener(`click`, onTypeChange));

    // смена направления
    const onDestinationChange = (evt) => {
      const newDestinationData = this._destinations.find((item) => item.name === evt.target.value);
      const newDestination = this._destinationComponent.getElement(newDestinationData);
      const oldDestination = this._eventFormElement.querySelector(`.event__section--destination`);
      eventDetailsContainer.replaceChild(newDestination, oldDestination);

    };
    destinationInput.addEventListener(`change`, onDestinationChange);

    // обработка события отправка формы / сохранить
    const onFormSubmit = (evt) => {
      evt.preventDefault();
      document.removeEventListener(`keydown`, onEscKeyDown);
      const formData = new FormData(this._eventFormElement);
      const offersEnabled = formData.getAll(`event-offer`);
      this._event.offers.forEach((item) => {
        item.isEnabled = offersEnabled.includes(item.name);
      });
      const entry = {
        type: formData.get(`event-type`),
        destinationPoint: formData.get(`event-destination`),
        description: formData.get(``),
        startDate: moment(formData.get(`event-start-time`), `DD-MM-YY kk-mm`),
        endDate: moment(formData.get(`event-end-time`), `DD-MM-YY kk-mm`),
        cost: parseInt(formData.get(`event-price`), 10),
        offers: this._event.offers,
        isFavorite: Boolean(formData.get(`event-favorite`)),
        id: this._event.id,
      };

      saveBtn.setAttribute(`disabled`, true);
      deleteBtn.setAttribute(`disabled`, true);
      saveBtn.innerText = `saving`;
      this._onDataChange(entry, this._event);
    };
    this._eventFormElement.addEventListener(`submit`, onFormSubmit);

    // нажатие esc
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(this._eventElement, this._eventFormElement);
      }
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    // клик по удалить
    const onBtnDeleteClick = () => {
      this._onDataChange(null, this._event);
      deleteBtn.setAttribute(`disabled`, true);
      deleteBtn.innerText = `deleting`;
    };
    deleteBtn.addEventListener(`click`, onBtnDeleteClick);


    render(this._container, this._eventElement, Position.BEFOREEND);
    flatpickr(this._eventFormElement.querySelectorAll(`.event__input--time`), EVENT_FORM_DATE_FORMAT);
  }

  // коллбек сброса на стандартный вид из режима редактирования
  setDefaultView() {
    if (this._container.contains(this._eventFormElement)) {
      this._container.replaceChild(this._eventElement, this._eventFormElement);
    }
  }
}

export default PointController;
