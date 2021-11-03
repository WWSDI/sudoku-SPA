import "./Game.css";
import { useReducer, useState } from "react";
import makeBd from "../lib/makeBd";
import { AC, actionType, BdType, CellType } from "../lib/types";
import Board from "./Board";
import BoardController from "./BoardController";
import GameController from "./GameController";
import Numpad from "./Numpad";

let initPuzzle = [
  3, 2, 1, 0, 4, 9, 8, 6, 5, 7, 5, 6, 3, 8, 2, 1, 9, 4, 4, 8, 9, 1, 5, 6, 3, 7,
  2, 2, 4, 3, 8, 9, 1, 7, 5, 6, 9, 7, 8, 5, 6, 3, 4, 2, 1, 6, 1, 5, 2, 7, 4, 9,
  8, 3, 8, 0, 4, 9, 1, 5, 2, 3, 7, 5, 9, 2, 4, 3, 7, 6, 1, 8, 1, 3, 7, 6, 2, 8,
  5, 4, 0,
];
let initSolution = [
  3, 2, 1, 7, 4, 9, 8, 6, 5, 7, 5, 6, 3, 8, 2, 1, 9, 4, 4, 8, 9, 1, 5, 6, 3, 7,
  2, 2, 4, 3, 8, 9, 1, 7, 5, 6, 9, 7, 8, 5, 6, 3, 4, 2, 1, 6, 1, 5, 2, 7, 4, 9,
  8, 3, 8, 6, 4, 9, 1, 5, 2, 3, 7, 5, 9, 2, 4, 3, 7, 6, 1, 8, 1, 3, 7, 6, 2, 8,
  5, 4, 9,
];

export default function Game() {
  const [puzzle, setPuzzle] = useState(initPuzzle);
  const [solution, setSolution] = useState(initSolution);
  const [ac, setAc] = useState<AC>(
    JSON.parse(localStorage.getItem("ac") as string) || { i: 0, v: 0 },
  );
  // keypress state is for solving the click ac and the user filled number disappear bug; delete this if no longer userful
  const [keypress, setKeypress] = useState(false);
  const [won, setWon] = useState(false);
  const bdReducer = (bd: BdType, action: actionType) => {
    switch (action.type) {
      case "SET_CELL_VALUE":
        const newBd1 = [...bd];
        const i = ac.i;
        const v = action.payload.v;
        //console.log(i, v);

        if (v !== undefined) {
          newBd1[i] = { ...bd[i] };
          if (bd[i].type === "user") {
            // if cell is empty, fill new value;
            if (bd[i].v !== v) {
              newBd1[i].v = v;
              // if new value is different than solution value, set error to true
              if (v !== solution[i]) {
                newBd1[i].error = true;
              } else {
                newBd1[i].error = false;
              }
            }
            //if given the same value as filled value, empty the cell
            else if (bd[i].v === v) {
              newBd1[i].v = 0;
              newBd1[i].error = false;
            }
          }
        }
        return newBd1;
      case "START_NEW_GAME":
        const newBd2 = action.payload.bd;
        if (newBd2 !== undefined) return newBd2;
        else return bd;
      // case "CLEAR_CELL_VALUE":
      //   return;
      default:
        throw new Error("Unhandled action type: " + action.type);
    }
  };
  console.log('👹',localStorage.bd)
  const [bd, bdDispatch] = useReducer(
    bdReducer,
    JSON.parse(localStorage.getItem("bd") as string) || makeBd(puzzle),
  );

  return (
    <div className="Game">
      <GameController
        bd={bd}
        bdDispatch={bdDispatch}
        ac={ac}
        setAc={setAc}
        keypress={keypress}
        setKeypress={setKeypress}
        won={won}
        setWon={setWon}
        puzzle={puzzle}
        setPuzzle={setPuzzle}
        solution={solution}
        setSolution={setSolution}
      />
      <Board
        bd={bd}
        bdDispatch={bdDispatch}
        ac={ac}
        setAc={setAc}
        keypress={keypress}
        setKeypress={setKeypress}
        won={won}
        setWon={setWon}
        puzzle={puzzle}
        setPuzzle={setPuzzle}
        solution={solution}
        setSolution={setSolution}
      />
      {/* <BoardController /> */}
      {won ? (
        <div className="congrats">
          <p>🎊🥳🎉</p>
          <p>You Won!</p>
          <p>🎊🍾🥂</p>
        </div>
      ) : (
        <Numpad
          bd={bd}
          bdDispatch={bdDispatch}
          ac={ac}
          setAc={setAc}
          keypress={keypress}
          setKeypress={setKeypress}
          won={won}
          setWon={setWon}
          puzzle={puzzle}
          setPuzzle={setPuzzle}
          solution={solution}
          setSolution={setSolution}
        />
      )}
    </div>
  );
}
