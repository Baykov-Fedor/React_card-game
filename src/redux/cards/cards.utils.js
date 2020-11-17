export const openCardHelper = (cardItems, idx) => {
  let copyItems = [...cardItems];
  copyItems[idx] = 1;
  return [...copyItems];
};

export const closeCardHelper = (cardItems, idx) => {
  let copyItems = [...cardItems];
  copyItems[idx] = 0;
  return [...copyItems];
};
