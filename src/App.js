import React from "react";

import "./App.css";
import "./components/game/game.component";
import Game from "./components/game/game.component";
import Welcome from "./components/welcome-window/welcome.component";

function App(props) {
  return (
    <div className="App">
      <Welcome />
      <Game />
    </div>
  );
}

export default App;
