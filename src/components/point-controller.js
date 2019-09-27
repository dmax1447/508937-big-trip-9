import {Position, EVENT_FORM_DATE_FORMAT} from './constants.js';
import {render} from './utils.js';
import TripEvent from './trip-event';
import TripEventForm from './trip-event-form.js';
import flatpickr from 'flatpickr';
import moment from 'moment';

class PointController {
  constructor(container, event, onDataChange, onChangeView, destinations, offers) {
    this._container = container;
    this._event = event;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._eventElement = new TripEvent(event).getElement();
    this._eventFormElement = new TripEventForm(event, destinations, offers).getElement();
    this.setDefaultView = this.setDefaultView.bind(this);
  }

  // рендер события
  render() {
    const openBtn = this._eventElement.querySelector(`.event__rollup-btn`);
    const closeBtn = this._eventFormElement.querySelector(`.event__rollup-btn`);
    const deleteBtn = this._eventFormElement.querySelector(`.event__reset-btn`);

    // клик по кнопке открыть
    const onBtnOpenFormClick = () => {
      this._onChangeView(); // зовем метод в TripController закрываем все остальные открытые формы
      this._container.replaceChild(this._eventFormElement, this._eventElement);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    // клик по кнопке открыть
    const onBtnCloseFormClick = () => {
      this._container.replaceChild(this._eventElement, this._eventFormElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    // обработка события отправка формы / сохранить
    const onFormSubmit = (evt) => {
      evt.preventDefault();
      this._container.replaceChild(this._eventElement, this._eventFormElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
      const formData = new FormData(this._eventFormElement);
      for (let pair of formData.entries()) {
        console.log(`${pair[0]} : ${pair[1]}`);
      }
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
        isFavorite: formData.get(`event-favorite`),
        id: this._event.id,
      };
      console.log(entry);
      this._onDataChange(entry, this._event);
    };

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

    };

    openBtn.addEventListener(`click`, onBtnOpenFormClick);
    closeBtn.addEventListener(`click`, onBtnCloseFormClick);
    deleteBtn.addEventListener(`click`, onBtnDeleteClick);
    this._eventFormElement.addEventListener(`submit`, onFormSubmit);

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
