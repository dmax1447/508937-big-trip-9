class ModelEventLocal {
  constructor(data) {
    this.cost = data.cost;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.isFavorite = false;
    this.destinationPoint = data.destinationPoint;
    this.description = data.description;
    this.offers = data.offers;
    this.pics = data.pics;
    this.type = data.type;
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
      'offers': this.offers.map((offer) => ({
        'title': offer.name,
        'price': offer.cost,
        'accepted': offer.isEnabled,
      })),
      'type': this.type,
    };
  }
}

export default ModelEventLocal;
