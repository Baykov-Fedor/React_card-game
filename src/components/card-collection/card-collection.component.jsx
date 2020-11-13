import React from "react";
import Card from "../card-item/card-item.component";

import "./card-collection.styles.scss";

// const generateKey = (pre) => {
//   return `${ pre }_${ new Date().getTime() }`;
// }

function CardCollection(props) {
  return (
    <div className="cardDesk" onClick={props.onClick}>
      {props.cardsArr.map((card, index) => {
        return (
          <Card
            key={index}
            idx={index}
            number={card[0]}
            suit={card[1]}
            backSide={card[2] === 0 ? true : false}
          />
        );
      })}
    </div>
  );
}

export default CardCollection;
