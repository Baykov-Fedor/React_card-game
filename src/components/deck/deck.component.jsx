import CustomButton from "../custom-button/custom-button.component";
import "./deck.styles.scss";

function Deck(props) {
  return (
    <div className="deck">
      <div className="deck--elements player">Player: {props.player}</div>
      <div className="deck--elements turn">Turn: {props.turn}</div>
      <CustomButton onClick={props.toLeaderBoard}>Leaderboard</CustomButton>
      <CustomButton onClick={props.reset}>Reset</CustomButton>
      <CustomButton onClick={props.win}>Cheat</CustomButton>
    </div>
  );
}

export default Deck;
