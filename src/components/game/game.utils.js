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

// handleEvent(e) {
//   let target = e.target;
//   if (target.className === "card--back") {
//     let stateArr = this.state.arrOfCards;
//     let prevIndex = this.state.match;
//     // Будем узнавать карту по индексу, который лежит в кач-ве innnerText
//     let curIndex = parseInt(target.innerText);
//     let curCard = stateArr[curIndex].slice(0, 2);
//     let copyArr = [...stateArr];
//     copyArr[curIndex][2] = 1;
//     // В любом случае открываем карту
//     this.setState({
//       arrOfCards: [...copyArr],
//     });
//     // Если у нас уже есть открытая карта
//     if (typeof prevIndex === "number") {
//       let prevCard = stateArr[prevIndex].slice(0, 2);
//       let turnsNum = this.state.turn;
//       let GuessedCards = this.state.numOfGuessedCards;
//       this.setState({
//         match: "",
//         turn: turnsNum + 1,
//       });
//       // Если ранеее открытая карта === текущей открытой карте
//       if (curCard[0] === prevCard[0]) {
//         GuessedCards += 2;
//         this.setState(
//           {
//             numOfGuessedCards: GuessedCards,
//           },
//           () => {
//             // Если мы отгадали вообще все карты
//             if (GuessedCards === this.state.arrOfCards.length) this.winGame();
//           }
//         );
//         // ранеее открытая карта != текущей открытой карте
//       } else {
//         // Тогда откроем её, запретим на секунду кликать по картам
//         this.setState(
//           {
//             clickable: false,
//           },
//           // А через 1с закроем обе
//           () =>
//             setTimeout(() => {
//               copyArr[prevIndex][2] = 0;
//               copyArr[curIndex][2] = 0;
//               this.setState({
//                 arrOfCards: [...copyArr],
//                 clickable: true,
//               });
//             }, 1000)
//         );
//       }
//     } else {
//       // Если у нас нету ранее открытой карты
//       this.setState({
//         match: curIndex,
//       });
//     }
//   } else return;
// }
