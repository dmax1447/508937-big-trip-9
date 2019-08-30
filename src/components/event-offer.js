const getEventOffer = ({name, cost}) => {
  return `
  <li class="event__offer">
    <span class="event__offer-title">${name}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${cost}</span>
  </li>
  `;
};

export default getEventOffer;
