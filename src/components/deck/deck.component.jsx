import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import "./deck.styles.scss";

//props = {userName}
function Deck(props) {
  return (
    <div className="deck">
      <div className="deck--elements player">Player: {props.userName}</div>
      <div className="deck--elements turn">Turn: {props.turn}</div>
      <CustomButton onClick={props.toLeaderBoard}>Leaderboard</CustomButton>
      <CustomButton onClick={props.reset}>Reset</CustomButton>
      <CustomButton onClick={props.win}>Cheat</CustomButton>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userName: state.user.currentUser,
});

export default connect(mapStateToProps)(Deck);
