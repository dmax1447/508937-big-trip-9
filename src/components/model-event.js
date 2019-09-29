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
    this.pics = data.destination.pictures.map((item) => ({
      src: item.src,
      description: item.description,
    }));
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

  toRAW() {
    return {
      'base_price': this.cost,
      'date_from': this.startDate.toISOString(),
      'date_to': this.endDate.toISOString(),
      'is_favorite': this.isFavorite,
      'destination': {
        'name': this.destinationPoint,
        'description': this.description,
        'pictures': this.pics.map((item) => ({
          'src': item.src,
          'description': item.description,
        }))
      },
      'id': this.id,
      'offers': this.offers.map((offer) => ({
        'title': offer.name,
        'price': offer.cost,
        'accepted': offer.isEnabled,
      })),
      'type': this.type,
    };
  }
}

export default ModelEvent;
