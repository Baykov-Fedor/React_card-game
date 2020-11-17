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
          <p className="card--face--number">{props.number}</p>
        </div>
      )}
    </div>
  );
}

export default Card;
