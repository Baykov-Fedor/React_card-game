import React from "react";

import "./App.css";
import "./components/game/game.component";
import Game from "./components/game/game.component";
import Welcome from "./components/welcome-window/welcome.component";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      difficulty: "easy",
      showModal: true,
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    if (this.state.userName === "") {
      document.querySelector("#name").classList.toggle("error");
      setTimeout(
        () => document.querySelector("#name").classList.toggle("error"),
        500
      );
      return;
    }
    this.setState({
      showModal: false,
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.showModal ? (
          <Welcome
            submit={this.submitForm}
            onChange={this.handleChange}
            name={this.state.userName}
            difficulty={this.state.difficulty}
          />
        ) : null}

        <Game
          difficulty={this.state.difficulty}
          playerName={this.state.userName}
        />
      </div>
    );
  }
}

export default App;
