export function shuffle(array) {
  let newArr = JSON.parse(JSON.stringify(array));
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function createRandomCards(collection, difficulty) {
  let newArr = [];
  switch (difficulty) {
    // В зависимости от сложности игры мы берём разное кол-во карт из коллекции
    case "easy":
      newArr = collection.slice(0, 20);
      return shuffle(newArr);
    case "medium":
      newArr = collection.slice(0, 24);
      return shuffle(newArr);
    case "hard":
      newArr = collection.slice(0, 30);
      return shuffle(newArr);
    default:
      break;
  }
}
