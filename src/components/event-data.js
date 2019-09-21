import {MILISECONDS_PER_DAY, MILISECONDS_PER_HOUR, DESTINATIONS, DESTINATION_DESCRIPTION, EVENT_TO_TEXT_MAP, EVENT_TYPE_OFFERS} from './constants.js';

const POINT_TYPES = [`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`];
const EVENT_CATEGORY = {
  move: [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`, `trip`],
  arrive: [`sightseeing`, `restaurant`, `check-in`]
};


const getRandomElement = (arr) => {
  const randomIndex = Math.round((arr.length - 1) * Math.random());
  return arr[randomIndex];
};

/**
 * вернет возможные предложения в зависимости от типа события
 * @param {String} eventType тип события
 * @return {Array} список возможных предложений
 */
const getOffers = (eventType) => {
  const eventCategoryNames = Object.keys(EVENT_CATEGORY);
  for (let categoryName of eventCategoryNames) {
    if (EVENT_CATEGORY[categoryName].includes(eventType)) {
      return EVENT_TYPE_OFFERS[categoryName];
    }
  }
  return null;
};

const getEventData = (id) => {
  const type = getRandomElement(POINT_TYPES);
  const startDate = Math.round(Date.now() + 3 * MILISECONDS_PER_DAY * Math.random() + 3 * MILISECONDS_PER_HOUR + (Math.random() * MILISECONDS_PER_HOUR));
  const endDate = Math.round(startDate + 3 * MILISECONDS_PER_HOUR * Math.random());
  const destinationPoint = getRandomElement(DESTINATIONS);
  const offers = getOffers(type);

  return ({
    type,
    destinationPoint,
    pics: [
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
    ],
    startDate,
    endDate,
    cost: Math.floor(Math.random() * 100),
    id,
    isFavorite: Math.random() >= 0.5,
    offers,

    get description() {
      return DESTINATION_DESCRIPTION[this.destinationPoint];
    },

    get placeholder() {
      return EVENT_TO_TEXT_MAP.get(this.type);
    },
  });
};

export default getEventData;
