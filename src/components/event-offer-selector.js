const getEventOfferSelector = ({name, cost, isEnabled}) => {
  return `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}" type="checkbox" name="event-offer-luggage" ${isEnabled ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${name}">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${cost}</span>
    </label>
  </div>
  `;
};

export default getEventOfferSelector;
