import React from "react";
import { connect } from "react-redux";

import CardCollection from "../card-collection/card-collection.component.jsx";
import Deck from "../deck/deck.component.jsx";
import LeaderBoard from "../leaderboard/leaderboard.component.jsx";
import {
  closeCard,
  openAllCards,
  openCard,
  setArrOfCards,
  setCardsState,
  setMatch,
} from "../../redux/cards/cards.actions.js";
import {
  increaseNumOfTurns,
  resetNumOfTurns,
} from "../../redux/user/user.actions.js";
import { newCollection } from "./game.data.js";
import { createRandomCards } from "./game.utils";

import "./game.styles.scss";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfGuessedCards: 0,
      win: false,
      clickable: true,
      showLeader: false,
    };
    this.handleEvent = this.handleEvent.bind(this);
  }

  // Когда компонент монтируется, то на основе выбранной ранее сложности замешивается колода
  async componentDidMount() {
    await this.props.setArrOfCards(
      createRandomCards(newCollection, this.props.difficulty)
    );
    await this.props.setCardsState([...this.props.arrOfCards].fill(0));
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.difficulty !== this.props.difficulty) {
      await this.props.setArrOfCards(
        createRandomCards(newCollection, this.props.difficulty)
      );
      await this.props.setCardsState([...this.props.arrOfCards].fill(0));
    }
  }

  resetGame = () => {
    this.props.setArrOfCards(
      createRandomCards(newCollection, this.props.difficulty)
    );
    this.props.setCardsState([...this.props.arrOfCards].fill(0));
    this.props.setMatch(null);
    this.props.resetNumOfTurns();
    this.setState({
      win: false,
      numOfGuessedCards: 0,
    });
  };

  // For testing
  test = () => {
    this.props.openAllCards();
    this.winGame();
  };

  winGame = () => {
    let userName = this.props.userName;
    let turn = this.props.currentTurns;
    this.setState({
      win: true,
    });
    let newRecord = { [userName]: turn };
    let oldRecords = JSON.parse(localStorage.getItem(this.props.difficulty));
    // Если в таблице сидит лучший рекорд.
    if (
      oldRecords !== null &&
      userName in oldRecords &&
      oldRecords[userName] < turn
    )
      return;
    let tempObj = { ...oldRecords, ...newRecord };
    localStorage.setItem(this.props.difficulty, JSON.stringify(tempObj));
  };

  handleEvent = (e) => {
    const {
      arrOfCards,
      openCard,
      closeCard,
      increaseNumOfTurns,
      match,
      setMatch,
    } = this.props;
    let target = e.target;
    if (target.className === "card--back") {
      let prevIndex = match;
      // Будем узнавать карту по индексу, который лежит в кач-ве innnerText
      let curIndex = parseInt(target.innerText);
      let curCard = arrOfCards[curIndex].split("-");
      // В любом случае открываем карту
      openCard(curIndex);
      // Если у нас уже есть открытая карта
      if (typeof prevIndex === "number") {
        let prevCard = arrOfCards[prevIndex].split("-");
        let GuessedCards = this.state.numOfGuessedCards;
        setMatch(null);
        increaseNumOfTurns();
        // Если ранеее открытая карта === текущей открытой карте
        if (curCard[0] === prevCard[0]) {
          GuessedCards += 2;
          this.setState(
            {
              numOfGuessedCards: GuessedCards,
            },
            // Если мы отгадали вообще все карты
            () => {
              if (GuessedCards === arrOfCards.length) this.winGame();
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
                closeCard(prevIndex);
                closeCard(curIndex);
                this.setState({ clickable: true });
              }, 1000)
          );
        }
      } else {
        // Если у нас нету ранее открытой карты
        setMatch(curIndex);
      }
    } else return;
  };

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
            onClick={this.state.clickable ? this.handleEvent : null}
          />
          <Deck
            toLeaderBoard={this.openLeaderboard}
            win={this.test}
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
  currentTurns: state.user.currentTurns,
  arrOfCards: state.cards.arrOfCards,
  cardsState: state.cards.cardsState,
  match: state.cards.match,
});

const mapDispatchToProps = (dispatch) => ({
  setArrOfCards: (arr) => dispatch(setArrOfCards(arr)),
  openCard: (index) => dispatch(openCard(index)),
  closeCard: (index) => dispatch(closeCard(index)),
  increaseNumOfTurns: () => dispatch(increaseNumOfTurns()),
  resetNumOfTurns: () => dispatch(resetNumOfTurns()),
  setMatch: (index) => dispatch(setMatch(index)),
  setCardsState: (arr) => dispatch(setCardsState(arr)),
  openAllCards: () => dispatch(openAllCards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
