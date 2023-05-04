import { useEffect, useState } from "react";
import { BoardProps, PuzzleSet, Difficulty } from "../lib/types";
import { fetchPuzzleSet, storeFetchedPuzzles } from "../lib/localStorage";
import "./GameController.css";
import makeBd from "../lib/makeBd";
import { awaitTimeout, isEmpty } from "../util/util";
import { randomFill } from "crypto";

export default function GameController({
  setPuzzle,
  setSolution,
  bdDispatch,
  setWon,
}: BoardProps) {
  const [difficulty, setDifficulty] = useState("easy");
  const [newGameState, setNewGameState] = useState("idle");

  const startNewGame = async () => {
    setNewGameState("pending");
    // await for 10s
    // await awaitTimeout(Math.random() * 10000);

    const puzzleSet = await fetchPuzzleSet(difficulty as Difficulty);

    if (puzzleSet) {
      setNewGameState("complete");
      setPuzzle(puzzleSet.puzzle);
      setSolution(puzzleSet.solution);
      bdDispatch({
        type: "START_NEW_GAME",
        payload: { bd: makeBd(puzzleSet.puzzle) },
      });
      setWon(false);
    }
    setNewGameState("idle");
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

      {newGameState === "pending" ? (
        <div className="warning">
          <div
            style={{
              display: "flex",
              borderRadius: "0.5rem",
              padding: "0 .5rem",
              alignItems: "center",
            }}
          >
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div>
              {/* <p>Loading</p> */}
              <p style={{ fontSize: "small", marginLeft: "0.7rem" }}>
                It may take up to <em>40s</em> due to Free Tier Server slow
                response
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div id="new-game" onClick={startNewGame}>
          NEW GAME
        </div>
      )}
      {/* This one needs to use conflict <div>Show Mistakes</div> */}
      {/* <div className="time">Time: </div> */}
    </div>
  );
}
