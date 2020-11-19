import { useState, useEffect } from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import ModalWindow from "../modal-window/modal-window.component";
import "./leaderboard.styles.scss";

function LeaderBoard({ toLeaderBoard, globalDifficulty, ...otherProps }) {
  // Создаём
  const [difficulty, setDifficulty] = useState(globalDifficulty);
  const [data, setData] = useState(localStorage.getItem(difficulty));

  // При обновлении сложности - обновляем данные для отображения
  useEffect(() => setData(localStorage.getItem(difficulty)), [difficulty]);

  function clearLeaderboard() {
    localStorage.clear();
    setData(null);
  }

  function makeArrFromData(data) {
    let tempData = JSON.parse(data);
    let gameData = [];
    for (let name in tempData) {
      gameData.push([name, tempData[name]]);
    }
    return gameData.sort(function (a, b) {
      return a[1] - b[1];
    });
  }

  return (
    <ModalWindow>
      <div className="leaderboard">
        <div className="leaderboard--controls">
          <CustomButton
            onClick={() => setDifficulty("easy")}
            disabled={difficulty === "easy"}
          >
            Easy
          </CustomButton>
          <CustomButton
            onClick={() => setDifficulty("medium")}
            disabled={difficulty === "medium"}
          >
            Meduim
          </CustomButton>
          <CustomButton
            onClick={() => setDifficulty("hard")}
            disabled={difficulty === "hard"}
          >
            Hard
          </CustomButton>
        </div>
        <table className="leaderboard--table">
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Number of Turns</th>
            </tr>
          </thead>
          <tbody>
            {data !== null
              ? makeArrFromData(data).map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value[0]}</td>
                      <td>{value[1]}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        <div className="leaderboard--controls">
          <CustomButton onClick={clearLeaderboard}>
            Clear Leaderboard
          </CustomButton>
          <CustomButton onClick={toLeaderBoard}>Close</CustomButton>
        </div>
      </div>
    </ModalWindow>
  );
}

const mapStateToProps = (state) => ({
  globalDifficulty: state.user.currentDifficulty,
});

export default connect(mapStateToProps)(LeaderBoard);
