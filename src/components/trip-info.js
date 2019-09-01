const getTripInfo = ({startDate, endDate, cities}) => {
  return `
  <div class="trip-info__main">
    <h1 class="trip-info__title">${cities[0]} ${cities.length > 3 ? `&mdash; ... &mdash;` : cities[1]} ${cities[cities.length - 1]}</h1>

    <p class="trip-info__dates">${new Date(startDate).toLocaleString(`ru-RU`, {month: `short`})} ${new Date(startDate).getDate()}&nbsp;&mdash;&nbsp;${new Date(endDate).getDate()}</p>
  </div>
  `;
};

export default getTripInfo;
