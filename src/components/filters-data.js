const getFiltersData = () => {
  const filterData = [
    {
      name: `everything`,
      isEnabled: true,
    },
    {
      name: `future`,
      isEnabled: false,
    },
    {
      name: `past`,
      isEnabled: false,
    },

  ];

  return filterData;
};

export default getFiltersData;
