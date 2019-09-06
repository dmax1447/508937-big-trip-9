const MILISECONDS_PER_MINUTE = 1000 * 60;
const MILISECONDS_PER_HOUR = MILISECONDS_PER_MINUTE * 60;
const MILISECONDS_PER_DAY = MILISECONDS_PER_HOUR * 24;
const LOCALE = `en-US`;

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
    hour12: false,
    hour: `2-digit`,
    minute: `2-digit`,
    year: `2-digit`,
    month: `2-digit`,
    day: `2-digit`
  };

const EVENT_TIME_FORMAT = {
  hour: `2-digit`,
  minute: `2-digit`,
  hour12: false,
};

const DAY_DATE_FORMAT = {
  month: `short`,
  day: `2-digit`,
};

const INFO_DATE_FORMAT = {
  month: `short`
};

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export {
  MILISECONDS_PER_DAY,
  MILISECONDS_PER_HOUR,
  MILISECONDS_PER_MINUTE,
  LOCALE, EVENT_TO_TEXT_MAP,
  EVENT_FORM_DATE_FORMAT,
  EVENT_TIME_FORMAT,
  DAY_DATE_FORMAT,
  INFO_DATE_FORMAT,
  Position,
};

