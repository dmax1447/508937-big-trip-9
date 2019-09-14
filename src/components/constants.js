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
    enableTime: true,
    // eslint-disable-next-line camelcase
    time_24hr: true,
    dateFormat: `d/m/y H:i`,
  };

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export {
  MILISECONDS_PER_DAY,
  MILISECONDS_PER_HOUR,
  MILISECONDS_PER_MINUTE,
  EVENT_TO_TEXT_MAP,
  EVENT_FORM_DATE_FORMAT,
  Position,
};

