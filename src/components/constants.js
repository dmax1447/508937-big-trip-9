const MILISECONDS_PER_MINUTE = 1000 * 60;
const MILISECONDS_PER_HOUR = MILISECONDS_PER_MINUTE * 60;
const MILISECONDS_PER_DAY = MILISECONDS_PER_HOUR * 24;

const EVENT_TO_TEXT_MAP = new Map(
    [
      [`bus`, `bus to`],
      [`check-in`, `check in`],
      [`drive`, `drive to`],
      [`flight`, `fly to`],
      [`restaurant`, `dinner at`],
      [`ship`, `sail to`],
      [`sightseeing`, `take a look of`],
      [`taxi`, `taxi to`],
      [`train`, `train to`],
      [`transport`, `transport to`],
      [`trip`, `trip to`],
    ]);

const EVENT_FORM_DATE_FORMAT =
  {
    'enableTime': true,
    'time_24hr': true,
    'dateFormat': `d/m/y H:i`,
  };

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const DESTINATION_DESCRIPTION = {
  'Amsterdam': `Capital and most populous city of the Netherlands, with a population of 866,737 within the city proper, 1,380,872 in the urban area, and 2,410,960 in the metropolitan area. Amsterdam is in the province of North Holland.`,
  'Geneva': `Second-most populous city in Switzerland (after Zürich) and the most populous city of Romandy, the French-speaking part of Switzerland. Situated where the Rhône exits Lake Geneva, it is the capital of the Republic and Canton of Geneva.`,
  'Chamonix': `Commune in the Haute-Savoie department in the Auvergne-Rhône-Alpes region in south-eastern France. It was the site of the first Winter Olympics in 1924. Situated to the north of Mont Blanc, and near the massive peaks of the Aiguilles Rouges and most notably the Aiguille du Midi`,
  'Berlin': `Capital and largest city of Germany by both area and population. Berlin straddles the banks of the River Spree, which flows into the River Havel (a tributary of the River Elbe) in the western borough of Spandau. Among the city's main topographical features are the many lakes in the western and southeastern boroughs formed by the Spree, Havel, and Dahme rivers.`,
  'Moscow': `Capital and most populous city of Russia, with 13.2 million residents within the city limits,[12] 17 million within the urban area[13] and 20 million within the metropolitan area.[14] Moscow is one of Russia's federal cities. Moscow is the major political, economic, cultural, and scientific center of Russia and Eastern Europe, as well as the largest city (both by population and by area) entirely on the European continent. `,
};

const DESTINATIONS = [`Amsterdam`, `Geneva`, `Chamonix`, `Berlin`, `Moscow`];

const EVENT_TYPE_OFFERS = {
  move: [
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
      name: `Choose seats`,
      cost: 9,
      isEnabled: Math.random() >= 0.5,
    }
  ],
  arrive: [
    {
      name: `Add meal`,
      cost: 2,
      isEnabled: Math.random() >= 0.5,
    },
    {
      name: `Choose seats`,
      cost: 9,
      isEnabled: Math.random() >= 0.5,
    }
  ],
};

export {
  MILISECONDS_PER_DAY,
  MILISECONDS_PER_HOUR,
  MILISECONDS_PER_MINUTE,
  EVENT_TO_TEXT_MAP,
  EVENT_FORM_DATE_FORMAT,
  Position,
  DESTINATIONS,
  DESTINATION_DESCRIPTION,
  EVENT_TYPE_OFFERS,
};


