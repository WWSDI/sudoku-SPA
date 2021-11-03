import "./GameController.css";
export default function GameController() {
  return (
    <div className="GameController">
      <label htmlFor="difficulty-select">
        Difficulty:
        <select name="difficulty" id="difficulty-select">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <div id="new-game">New Game</div>
      {/* This one needs to use conflict <div>Show Mistakes</div> */}
      <div className="label">total time: </div>
    </div>
  );
}
