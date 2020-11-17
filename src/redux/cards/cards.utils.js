export const openCard = (cardItems, idx) => {
  let copyItems = [...cardItems];
  copyItems[idx] = 1;
  return [...copyItems];
};

export const closeCard = (cardItems, idx) => {
  let copyItems = [...cardItems];
  copyItems[idx] = 0;
  return [...copyItems];
};
