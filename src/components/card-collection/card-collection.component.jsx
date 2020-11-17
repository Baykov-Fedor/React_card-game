import React from "react";
import { connect } from "react-redux";
import Card from "../card-item/card-item.component";

import "./card-collection.styles.scss";

// const generateKey = (pre) => {
//   return `${ pre }_${ new Date().getTime() }`;
// }

function CardCollection({ arrOfCards, cardsState, onClick }) {
  return (
    <div className="cardDesk" onClick={onClick}>
      {arrOfCards.map((card, index) => {
        return (
          <Card
            key={index}
            idx={index}
            number={card.split("-")[0]}
            suit={card.split("-")[1]}
            backSide={cardsState[index] === 0 ? true : false}
          />
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  arrOfCards: state.cards.arrOfCards,
  cardsState: state.cards.cardsState,
});

export default connect(mapStateToProps)(CardCollection);
