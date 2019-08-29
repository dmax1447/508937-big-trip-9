const MOCK_DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];

const MOCK_DESTINATIONS = [`Kolyma`, `Magadan`, `Yakutsk`, `Norilsk`, `Anadyr`, `airport`, `hotel`, `museum`];

const pointTypes = [
  `bus`,
  `check-in`,
  `drive`,
  `flight`,
  `restaurant`,
  `ship`,
  `sightseeing`, `taxi`, `train`, `transport`, `trip`];

const options = [
  {
    name: `Add luggage`,
    cost: 10,
    isEnabled: Math.random() > 0.5,
  },
  {
    name: `Switch to comfort class`,
    cost: 150,
    isEnabled: Math.random() > 0.5,
  },
  {
    name: `Add meal`,
    cost: 2,
    isEnabled: Math.random() > 0.5,
  },
  {
    name: `Choose seats`,
    cost: 9,
    isEnabled: Math.random() > 0.5,
  },
];

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

const getTripEventData = () => ({
  type: getRandomElement(pointTypes),
  destinationPoint: getRandomElement(MOCK_DESTINATIONS),
  pics: [
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
  ],
  description: generateRandomArr(MOCK_DESCRIPTIONS, 4).join(``),
  startDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  endDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000 + 1000 * 60 * 20,
  cost: Math.floor(Math.random() * 100),
  options: generateRandomArr(options, 3),
});

const getTripDayData = () => {
  const EVENTS_IN_DAY_COUNT = 4;

  return ({
    date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    events: new Array(EVENTS_IN_DAY_COUNT).fill(``).map(() => getTripEventData()),
  });
};

export default getTripDayData;


