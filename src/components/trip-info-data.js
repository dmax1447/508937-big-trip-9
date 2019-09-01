const getTripInfoData = (tripData) => {
  const tripInfoData = {};

  tripInfoData.cities = tripData.reduce((acc, day) => {
    const dayCities = day.events.reduce((acc2, event) => [...acc2, event.destinationPoint], []);
    return [...acc, ...dayCities];
  }, []);

  tripInfoData.totalCost = tripData.reduce((acc, day) => {
    const dayCost = day.events.reduce((acc2, event) => acc2 + event.cost, 0);
    return acc + dayCost;
  }, 0);

  tripInfoData.startDate = tripData[0].events[0].startDate;
  const lastEventIndex = tripData[tripData.length - 1].events.length - 1;
  tripInfoData.endDate = tripData[tripData.length - 1].events[lastEventIndex].endDate;


  return tripInfoData;
};

export default getTripInfoData;
