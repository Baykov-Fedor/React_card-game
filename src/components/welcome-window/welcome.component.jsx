import React from "react";
import ModalWindow from "../modal-window/modal-window.component";

import "./welcome.styles.scss";

function Welcome(props) {
  return (
    <ModalWindow>
      <div className="game-settings">
        <form className="game-settings--form" id="form" onSubmit={props.submit}>
          <input
            type="text"
            name="userName"
            id="name"
            placeholder="Your name..."
            onChange={props.onChange}
            className="game-settings--form--input"
            value={props.name}
          />
          <div>
            <label htmlFor="difficulty">Choose a difficulty:</label>
            <select
              id="difficulty"
              name="difficulty"
              value={props.difficulty}
              onChange={props.onChange}
              className="game-settings--form--select"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <input type="submit" value="Done" />
        </form>
      </div>
    </ModalWindow>
  );
}

export default Welcome;
