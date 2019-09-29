import ModelEvent from './model-event.js';
import ModelOffer from './model-offer';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

const API = class {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
    this._headers = {
      'Authorization': authorization,
      'Content-Type': `application/json`,
    };
  }

  _load({url, method = Method.GET, body = null, headers = this._headers}) {
    // headers.append(`Authorization`, this._authorization);
    // headers.append(`Content-Type`, `application / json`);
    return fetch(`${this._endPoint}${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }

  getEvents() {
    return this._load({url: `points`})
      .then(toJSON)
      .then(ModelEvent.parseEvents);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(toJSON);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(toJSON)
      .then(ModelOffer.parseOffers);
  }

  // createEvent({event}) {
  // }

  updateEvent(data) {
    return this._load({
      url: `points/${data.id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
    });
  }

  deleteEvent({id}) {

    return this._load({
      url: `points/${id}`,
      method: Method.DELETE,
    });
  }


};

export default API;
