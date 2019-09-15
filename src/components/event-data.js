import {MILISECONDS_PER_DAY, MILISECONDS_PER_HOUR} from './constants.js';

const MOCK_DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];

const MOCK_DESTINATIONS = [`Amsterdam`, `Geneva`, `Chamonix`, `Berlin`, `Moscow`];

const DESTINATION_DESCRIPTION = {
  'Amsterdam': `Capital and most populous city of the Netherlands, with a population of 866,737 within the city proper, 1,380,872 in the urban area, and 2,410,960 in the metropolitan area. Amsterdam is in the province of North Holland.`,
  'Geneva': `Second-most populous city in Switzerland (after Zürich) and the most populous city of Romandy, the French-speaking part of Switzerland. Situated where the Rhône exits Lake Geneva, it is the capital of the Republic and Canton of Geneva.`,
  'Chamonix': `Commune in the Haute-Savoie department in the Auvergne-Rhône-Alpes region in south-eastern France. It was the site of the first Winter Olympics in 1924. Situated to the north of Mont Blanc, and near the massive peaks of the Aiguilles Rouges and most notably the Aiguille du Midi`,
  'Berlin': `Capital and largest city of Germany by both area and population. Berlin straddles the banks of the River Spree, which flows into the River Havel (a tributary of the River Elbe) in the western borough of Spandau. Among the city's main topographical features are the many lakes in the western and southeastern boroughs formed by the Spree, Havel, and Dahme rivers.`,
  'Moscow': `Capital and most populous city of Russia, with 13.2 million residents within the city limits,[12] 17 million within the urban area[13] and 20 million within the metropolitan area.[14] Moscow is one of Russia's federal cities. Moscow is the major political, economic, cultural, and scientific center of Russia and Eastern Europe, as well as the largest city (both by population and by area) entirely on the European continent. `,
};

const POINT_TYPES = [`bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`];

const POINT_TYPE_OFFERS = new Map(
    [[`taxi`, `bus`, `flight`, `ship`, `train`, `drive`],
      [
        {
          name: `Add luggage`,
          cost: 10,
          isEnabled: Math.random() >= 0.5,
        },
        {
          name: `Switch to comfort`,
          cost: 150,
          isEnabled: Math.random() >= 0.5,
        },
        {
          name: `Add meal`,
          cost: 2,
          isEnabled: Math.random() >= 0.5,
        },
        {
          name: `Choose seats`,
          cost: 9,
          isEnabled: false,
        }
      ]],
    [[`check-in`, `sightseeing`, `restaurant`],
      [
        {
          name: `Switch to comfort`,
          cost: 150,
          isEnabled: Math.random() >= 0.5,
        },
        {
          name: `Add meal`,
          cost: 2,
          isEnabled: Math.random() >= 0.5,
        },
      ]]
);

const getRandomElement = (arr) => {
  const randomIndex = Math.round((arr.length - 1) * Math.random());
  return arr[randomIndex];
};

const generateRandomArr = (mokdata, maxLength) => {
  const arrLength = Math.ceil(Math.random() * maxLength);
  const mokArr = [];
  for (let i = 0; i < arrLength; i++) {
    mokArr.push(getRandomElement(mokdata));
  }
  return mokArr;
};

const getEventData = (id) => {
  const startDate = Math.round(Date.now() + 3 * MILISECONDS_PER_DAY * Math.random() + 3 * MILISECONDS_PER_HOUR + (Math.random() * MILISECONDS_PER_HOUR));
  const endDate = Math.round(startDate + 3 * MILISECONDS_PER_HOUR * Math.random());
  const destinationPoint = getRandomElement(MOCK_DESTINATIONS);
  const description = DESTINATION_DESCRIPTION[destinationPoint];

  return ({
    type: getRandomElement(POINT_TYPES),
    destinationPoint,
    pics: [
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
      `http://picsum.photos/300/150?r=${Math.random()}`,
    ],
    description,
    startDate,
    endDate,
    cost: Math.floor(Math.random() * 100),
    offers: [
      {
        name: `Add luggage`,
        cost: 10,
        isEnabled: Math.random() >= 0.5,
      },
      {
        name: `Switch to comfort`,
        cost: 150,
        isEnabled: Math.random() >= 0.5,
      },
      {
        name: `Add meal`,
        cost: 2,
        isEnabled: Math.random() >= 0.5,
      },
      {
        name: `Choose seats`,
        cost: 9,
        isEnabled: false,
      },
    ],
    id,
    isFavorite: Math.random() >= 0.5,
  });
};

export default getEventData;
