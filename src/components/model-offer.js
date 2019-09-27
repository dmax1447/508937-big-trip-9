class ModelOffer {
  constructor(data) {
    this.type = data.type;
    this.offers = data.offers.map((offer) => ({
      name: offer.title,
      cost: parseInt(offer.price, 10),
    }));
  }
  static parseOffer(data) {
    return new ModelOffer(data);
  }

  static parseOffers(data) {
    return data.map(ModelOffer.parseOffer);
  }
}

export default ModelOffer;

