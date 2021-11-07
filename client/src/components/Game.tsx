import "./Game.css";
import { useReducer, useState } from "react";
import makeBd from "../lib/makeBd";
import { AC, actionType, BdType, CellType } from "../lib/types";
import Board from "./Board";
import BoardController from "./BoardController";
import GameController from "./GameController";
import Numpad from "./Numpad";
import { getSudokuIndices } from "../util/util";

let initPuzzle = [
  3, 0, 9, 5, 1, 7, 0, 6, 0, 1, 2, 6, 8, 3, 0, 7, 5, 9, 0, 7, 5, 9, 0, 2, 3, 1,
  4, 5, 0, 4, 7, 0, 6, 1, 0, 3, 6, 1, 3, 4, 9, 0, 5, 0, 7, 0, 8, 0, 0, 5, 1, 9,
  4, 0, 0, 0, 1, 6, 7, 0, 0, 9, 0, 0, 6, 2, 0, 8, 9, 0, 0, 0, 9, 0, 0, 0, 0, 5,
  6, 0, 1,
];
let initSolution = [
  3, 4, 9, 5, 1, 7, 8, 6, 2, 1, 2, 6, 8, 3, 4, 7, 5, 9, 8, 7, 5, 9, 6, 2, 3, 1,
  4, 5, 9, 4, 7, 2, 6, 1, 8, 3, 6, 1, 3, 4, 9, 8, 5, 2, 7, 2, 8, 7, 3, 5, 1, 9,
  4, 6, 4, 5, 1, 6, 7, 3, 2, 9, 8, 7, 6, 2, 1, 8, 9, 4, 3, 5, 9, 3, 8, 2, 4, 5,
  6, 7, 1,
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
        let newBd1 = [...bd];
        const i = ac.i;
        const v = action.payload.v;
        //console.log(i, v);

        if (v !== undefined) {
          newBd1[i] = { ...bd[i] };
          // 1. Change cell value
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
          // 2. Change conflict arr based on cell value change
          const sudokuIndicesNoAc = getSudokuIndices(i).filter(
            (idx) => idx !== i,
          );
          // 2.1 change conflict arr for sudoku cells (bar the ac)
          let conflictFlag = false;
          newBd1 = newBd1.map((cell, idx, val) => {
            if (sudokuIndicesNoAc.includes(idx)) {
              // 2.1.1 add i to conflict arr
              if (bd[idx].v !== 0 && cell.v === newBd1[i].v) {
                conflictFlag = true;
                const newConflict = [...cell.conflict];
                newConflict.push(i);
                return { ...cell, conflict: newConflict };
              } else {
                return cell;
              }
            } else {
              return cell;
            }
          });

          // 2.1.2 calculate ac's conflict status based on other sudokuCell's conflict arr
          if (conflictFlag) {
            // change the ac's conflict status
            const newConflict = [...newBd1[i].conflict];
            newConflict.push(i);
            newBd1[i].conflict = newConflict;
          }

          // 2.2 remove i from conflict arr
          let deconflictFlag = false;
          newBd1 = newBd1.map((cell, idx, val) => {
            // 2.2.1
            if (sudokuIndicesNoAc.includes(idx)) {
              if (cell.conflict.includes(i) && cell.v !== newBd1[i].v) {
                deconflictFlag = true;
                return {
                  ...cell,
                  conflict: cell.conflict.filter((idx) => idx !== i),
                };
              } else {
                return cell;
              }
            } else {
              return cell;
            }
          });
          // 2.2.2 calculate ac's conflict status based on other sudokuCell's conflict arr
          if (deconflictFlag) {
            // change the ac's conflict status
            newBd1[i].conflict = newBd1[i].conflict.filter((idx) => idx !== i);
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
          <p>👏🍾🥂</p>
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
