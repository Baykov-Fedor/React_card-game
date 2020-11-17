import React from "react";
import { connect } from "react-redux";

import CardCollection from "../card-collection/card-collection.component.jsx";
import Deck from "../deck/deck.component.jsx";
import LeaderBoard from "../leaderboard/leaderboard.component.jsx";

import collection from "./game.data.js";
import { shuffle } from "./game.utils";

import "./game.styles.scss";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      arrOfCards: [],
      match: "",
      win: false,
      numOfGuessedCards: 0,
      clickable: true,
      showLeader: false,
    };
    this.handleEvent = this.handleEvent.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.winGame = this.winGame.bind(this);
  }

  createRandomCards(difficulty) {
    let newArr = [];
    switch (difficulty) {
      // В зависимости от сложности игры мы берём разное кол-во карт из коллекции
      // Создаём этим картам пары и перемешиваем
      case "easy":
        newArr = collection.slice(0, 10);
        newArr = [...newArr, ...newArr];
        return shuffle(newArr);
      case "medium":
        newArr = collection.slice(0, 13);
        newArr = [...newArr, ...newArr];
        return shuffle(newArr);
      case "hard":
        newArr = collection.slice(0, 15);
        newArr = [...newArr, ...newArr];
        return shuffle(newArr);
      default:
        break;
    }
  }
  // Когда компонент монтируется, то на основе выбранной ранее сложности замешивается колода
  componentDidMount() {
    this.setState({
      arrOfCards: this.createRandomCards(this.props.difficulty),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.difficulty !== this.props.difficulty) {
      this.setState({
        arrOfCards: this.createRandomCards(this.props.difficulty),
      });
    }
  }

  resetGame() {
    this.setState({
      arrOfCards: this.createRandomCards(this.props.difficulty),
      turn: 0,
      match: "",
      win: false,
      numOfGuessedCards: 0,
    });
  }

  winGame() {
    // For testing
    let stateArr = this.state.arrOfCards;
    let copyArr = [...stateArr];
    copyArr.map((value) => (value[2] = 1));

    let userName = this.props.userName;
    let turn = this.state.turn;

    this.setState({
      win: true,
      arrOfCards: [...copyArr],
    });
    let newRecord = { [userName]: turn };
    let oldRecords = JSON.parse(localStorage.getItem("CardGame"));
    let tempObj = { ...oldRecords, ...newRecord };
    localStorage.setItem("CardGame", JSON.stringify(tempObj));
  }

  handleEvent(e) {
    let target = e.target;
    if (target.className === "card--back") {
      let stateArr = this.state.arrOfCards;
      let prevIndex = this.state.match;
      // Будем узнавать карту по индексу, который лежит в кач-ве innnerText
      let curIndex = parseInt(target.innerText);
      let curCard = stateArr[curIndex].slice(0, 2);
      let copyArr = [...stateArr];
      copyArr[curIndex][2] = 1;
      // В любом случае открываем карту
      this.setState({
        arrOfCards: [...copyArr],
      });
      // Если у нас уже есть открытая карта
      if (typeof prevIndex === "number") {
        let prevCard = stateArr[prevIndex].slice(0, 2);
        let turnsNum = this.state.turn;
        let GuessedCards = this.state.numOfGuessedCards;
        this.setState({
          match: "",
          turn: turnsNum + 1,
        });
        // Если ранеее открытая карта === текущей открытой карте
        if (curCard.every((value, index) => value === prevCard[index])) {
          GuessedCards += 2;
          this.setState(
            {
              numOfGuessedCards: GuessedCards,
            },
            () => {
              // Если мы отгадали вообще все карты
              if (GuessedCards === this.props.difficulty) this.winGame();
            }
          );
          // ранеее открытая карта != текущей открытой карте
        } else {
          // Тогда откроем её, запретим на секунду кликать по картам
          this.setState(
            {
              clickable: false,
            },
            // А через 1с закроем обе
            () =>
              setTimeout(() => {
                copyArr[prevIndex][2] = 0;
                copyArr[curIndex][2] = 0;
                this.setState({
                  arrOfCards: [...copyArr],
                  clickable: true,
                });
              }, 1000)
          );
        }
      } else {
        // Если у нас нету ранее открытой карты
        this.setState({
          match: curIndex,
        });
      }
    } else return;
  }

  openLeaderboard = () => {
    this.setState({
      showLeader: !this.state.showLeader,
    });
  };

  render() {
    return (
      <div className="game">
        {this.state.showLeader ? (
          <LeaderBoard toLeaderBoard={this.openLeaderboard} />
        ) : null}
        {this.state.win ? <h2>You are winner!</h2> : null}
        <div className="game--main">
          <CardCollection
            cardsArr={this.state.arrOfCards}
            onClick={this.state.clickable ? this.handleEvent : null}
          />
          <Deck
            toLeaderBoard={this.openLeaderboard}
            turn={this.state.turn}
            win={this.winGame}
            reset={this.resetGame}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.currentUser,
  difficulty: state.user.currentDifficulty,
});

export default connect(mapStateToProps)(Game);
