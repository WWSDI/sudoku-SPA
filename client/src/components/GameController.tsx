import { useState } from "react";
import { Puzzle } from "../lib/types";
import { fetchPuzzles, storeFetchedPuzzles } from "../lib/localStorage";
import "./GameController.css";
import { setTokenSourceMapRange } from "typescript";
export default function GameController() {
  const [difficulty, setDifficulty] = useState("easy");

  const startNewGame = () => {
    console.log(difficulty);

    let data = localStorage.getItem(`puzzles-${difficulty}`);
    // This is not the best solution as the wait time is arbitrarily set, but I don't know how to make this cb() wait for the if statement to execute and store all fetched data to localstorage first
    setTimeout(() => {
      let localPuzzles = JSON.parse(data as string);
      console.log("Parsed Puzzles:", localPuzzles);

      const { puzzle: newPuzzle, solution: newSolution } =
        localPuzzles.pop() as Puzzle;

      console.log(newPuzzle, newSolution);

      // use newPuzzle, newSolution to set the state of the game

      // save the popped localPuzzles back to localStorage
      if (localPuzzles.length === 0) {
        localStorage.setItem(`puzzles-${difficulty}`, JSON.stringify(null));
      } else {
        localStorage.setItem(
          `puzzles-${difficulty}`,
          JSON.stringify(localPuzzles),
        );
      }
      console.log(localStorage.getItem(`puzzles-${difficulty}`));
    }, 100);

    if (data === "null") {
      (async () => {
        // if no more local storage puzzles, then fetch and store
        const puzzles = await fetchPuzzles();
        if (puzzles !== undefined) {
          storeFetchedPuzzles(puzzles);
          data = localStorage.getItem(`puzzles-${difficulty}`);
        }
      })();
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
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <div id="new-game" onClick={startNewGame}>
        New Game
      </div>
      {/* This one needs to use conflict <div>Show Mistakes</div> */}
      <div className="label">total time: </div>
    </div>
  );
}
