import { useState } from "react";
import { BoardProps, PuzzleSet, Difficulty } from "../lib/types";
import { fetchPuzzleSet, storeFetchedPuzzles } from "../lib/localStorage";
import "./GameController.css";
import makeBd from "../lib/makeBd";
import { isEmpty } from "../util/util";

export default function GameController({
  setPuzzle,
  setSolution,
  bdDispatch,
  setWon,
}: BoardProps) {
  const [difficulty, setDifficulty] = useState("easy");

  const startNewGame = async () => {
    const puzzleSet = await fetchPuzzleSet(difficulty as Difficulty);

    if (puzzleSet) {
      setPuzzle(puzzleSet.puzzle);
      setSolution(puzzleSet.solution);
      bdDispatch({
        type: "START_NEW_GAME",
        payload: { bd: makeBd(puzzleSet.puzzle) },
      });
      setWon(false);
    }
  };

  return (
    <div className="GameController">
      <label htmlFor="difficulty-select">
        Difficulty:
        <select
          name="difficulty"
          id="difficulty-select"
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
          }}
        >
          <option value="testing">Test</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="hell">Hell</option>
        </select>
      </label>
      <div id="new-game" onClick={startNewGame}>
        New Game
      </div>
      {/* This one needs to use conflict <div>Show Mistakes</div> */}
      {/* <div className="time">Time: </div> */}
    </div>
  );
}
