export const openCardHelper = (cardItems, idx) => {
  let copyItems = [...cardItems];
  copyItems[idx] = 1;
  return [...copyItems];
};

export const openAllCardsHelper = (cardItems) => {
  return [...cardItems.fill(1)];
};

export const closeCardHelper = (cardItems, idx) => {
  let copyItems = [...cardItems];
  copyItems[idx] = 0;
  return [...copyItems];
};
