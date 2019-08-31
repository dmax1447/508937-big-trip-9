const getFiltersData = () => {
  return [
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
};

export default getFiltersData;
