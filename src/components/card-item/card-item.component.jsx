import React from "react";

import "./card-item.styles.scss";

function Card(props) {
  return (
    <div className="card">
      {/* Если сторона задняя то просто рубашка */}
      {props.backSide ? (
        <div className="card--back">{props.idx}</div>
      ) : (
        <div className={`card--face ${props.suit}`}>
          {/* В зависимости от suit будем менять стиль карты*/}
          <p>{props.number}</p>
        </div>
      )}
    </div>
  );
}

export default Card;

// function getCard(num) {
//   if (num <= 10) return num;
//   else {
//     switch(x) {
//       case '11':
//         return 'J';
//       case '12':
//         return 'Q';
//       case '13':
//         return 'K';
//       case '14':
//         return 'A';
//       default:
//         break;
//     }
//   }
// }
