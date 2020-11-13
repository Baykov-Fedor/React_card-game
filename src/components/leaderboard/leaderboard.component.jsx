import { useState } from "react";
import CustomButton from "../custom-button/custom-button.component";
import ModalWindow from "../modal-window/modal-window.component";
import "./leaderboard.styles.scss";

function LeaderBoard(props) {
  const [data, setData] = useState(localStorage.getItem("CardGame"));

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
    return gameData;
  }

  return (
    <ModalWindow>
      <div className="leaderboard">
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
          <CustomButton onClick={props.toLeaderBoard}>Close</CustomButton>
        </div>
      </div>
    </ModalWindow>
  );
}

export default LeaderBoard;
