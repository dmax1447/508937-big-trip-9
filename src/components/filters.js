const getFilter = (filter) => {
  return `
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${filter.isEnabled ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-everything">${filter.name}</label>
  </div>
  `;
};

const getFilters = (filtersData) => {
  return `
  <form class="trip-filters" action="#" method="get">
    ${filtersData.map((item) => getFilter(item)).join(``)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `;
};

export default getFilters;
