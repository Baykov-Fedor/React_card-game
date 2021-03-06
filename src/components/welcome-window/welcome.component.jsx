import React, { useState } from "react";
import { connect } from "react-redux";
import {
  setCurrentDifficulty,
  setCurrentUser,
} from "../../redux/user/user.actions";
import ModalWindow from "../modal-window/modal-window.component";

import "./welcome.styles.scss";

function Welcome({
  setCurrentDifficulty,
  setCurrentUser,
  userName,
  difficulty,
}) {
  const [showModal, setShowModal] = useState(true);

  let handleChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    switch (name) {
      case "userName":
        return setCurrentUser(value);
      case "difficulty":
        return setCurrentDifficulty(value);
      default:
        return;
    }
  };

  let submitForm = (evt) => {
    evt.preventDefault();
    if (userName === "") {
      document.querySelector("#name").classList.toggle("error");
      setTimeout(
        () => document.querySelector("#name").classList.toggle("error"),
        500
      );
      return;
    }
    setShowModal(false);
  };

  return showModal ? (
    <ModalWindow>
      <div className="game-settings">
        <form className="game-settings--form" id="form" onSubmit={submitForm}>
          <input
            type="text"
            name="userName"
            id="name"
            placeholder="Your name..."
            onChange={handleChange}
            className="game-settings--form--input"
            value={userName}
          />
          <div>
            <label htmlFor="difficulty">Choose a difficulty:</label>
            <select
              id="difficulty"
              name="difficulty"
              value={difficulty}
              onChange={handleChange}
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
  ) : null;
}

const mapStateToProps = (state) => ({
  userName: state.user.currentUser,
  difficulty: state.user.currentDifficulty,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setCurrentDifficulty: (user) => dispatch(setCurrentDifficulty(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
