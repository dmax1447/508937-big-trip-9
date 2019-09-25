class ModelEvent {
  constructor(data) {
    this.type = data.type;
    this.startDate = new Date(data.date_from);
    this.endDate = new Date(data.date_to);
    this.cost = parseInt(data.base_price, 10);
    this.id = data.id;
    this.isFavorite = Boolean(data.is_favotite);
    this.destinationPoint = data.destination.name;
    this.description = data.destination.description;
    this.pics = data.destination.pictures.map((item) => item.src);
    this.offers = data.offers.map((offer) => ({
      name: offer.title,
      cost: parseInt(offer.price, 10),
      isEnabled: Boolean(offer.accepted)
    }));
  }

  static parseEvent(data) {
    return new ModelEvent(data);
  }

  static parseEvents(data) {
    return data.map(ModelEvent.parseEvent);
  }
}

export default ModelEvent;
