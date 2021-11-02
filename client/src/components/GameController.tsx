export default function GameController() {
  return (
    <>
      <select name="difficulty" id="difficulty-select">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <div>New Game</div>
      {/* This one needs to use conflict <div>Show Mistakes</div> */}
      <div>total time: </div>
    </>
  );
}
