import Cell from "./Cell";
import "./Board.css";
import { CellType, BdType, BoardProps } from "../lib/types";
import { useEffect, useState } from "react";
import {
  get2DSolutionFromBd,
  getSudoku,
  idToIndex,
  idxToij,
  indexToSelector,
} from "../util/util";
import makeBd from "../lib/makeBd";
import validateSolution from "../util/sudokuValidator";

// Highlighting

export default function Board({
  bd,
  bdDispatch,
  ac,
  setAc,
  keypress,
  setKeypress,
  won,
  setWon,
  puzzle,
}: BoardProps): JSX.Element {
  const [sudoku, setSudoku] = useState<Element[]>([]);

  const getSudokuVals = (sudoku: Element[]) => {
    const sudokuVals = [];
    for (let i = 0; i < sudoku.length; i++) {
      const idx = idToIndex(sudoku[i].id);
      sudokuVals.push(bd[idx].v);
    }
    return sudokuVals;
  };

  // Remove highlight of sudoku, ac and same num
  const remove3Hl = () => {
    const allCells = document.querySelectorAll(".Cell");
    allCells.forEach((cell) => {
      cell.classList.remove("hl-sudoku", "hl-ac", "hl-same-num");
    });
  };
  const hlAC = (idx: number) => {
    const AC = document.querySelector(indexToSelector(idx));
    AC?.classList.add("hl-ac");
  };
  const hlSameNum = (idx: number) => {
    // Create same num array and sudoku array
    // const AC = document.querySelector(indexToSelector(idx));
    const ACVal = bd[idx].v;
    const allCells = document.querySelectorAll(".Cell");
    const sameNumCells: Element[] = Array.from(allCells).filter((cell) => {
      // console.log("😱", cell);
      const cellIdx = idToIndex(cell.id);
      const cellVal = bd[cellIdx].v;
      return cellVal !== 0 && cellVal === ACVal;
    });

    sameNumCells.forEach((cell) => cell.classList.add("hl-same-num"));
  };
  const hlSudoku = (idx: number) => {
    sudoku.forEach((cell) => cell.classList.add("hl-sudoku"));
  };
 
  const hlConflict = () => {
    const allCells = document.querySelectorAll(".Cell");
    allCells.forEach((cell) => {
      if (bd[idToIndex(cell.id)].conflict) {
        // highlight conflict cells
        cell.classList.add("hl-conflict");
      } else {
        // do NOT highlight non-conflict cells
        cell.classList.remove("hl-conflict");
      }
    });
  };
  const didIWin = () => {
    // 1. check if all cells are filled
    // 2. check if all cells' error property are false
    // for (let cell of bd) {
    //   if (cell.v === 0 || cell.error === true) return false;
    // }
    const solution2D = get2DSolutionFromBd(bd);
    console.log("2D Solution:", solution2D);
    const result = validateSolution(solution2D);
    console.log("Result:", result);

    return result;
  };

  // 1. update sudoku
  useEffect(() => {
    setSudoku(getSudoku(ac.i));
  }, [ac]);

  // 2. highlight sudoku, ac, same num
  useEffect(() => {
    // remove highlight of sudoku, ac and same num
    remove3Hl();
    // add new highlight of sudoku, ac and same num
    hlSudoku(ac.i);
    hlSameNum(ac.i);
    hlAC(ac.i);
  }, [bd, sudoku]); // ignore the dependency warning

  useEffect(() => {
    hlConflict();
  }, [bd]);

  // 3. highlight conflict when bd chagnes
  useEffect(() => {
    if (didIWin()) setWon(true);
    // console.log("WON:", won);
    // every time bd changes, store bd, ac to localStorage
    localStorage.setItem("bd", JSON.stringify(bd));
    localStorage.setItem("ac", JSON.stringify(ac));
  }, [bd, ac]);

  return (
    <div
      className="Board"
      id="Board"
      onClick={(e) => {
        // 👹👹👹 use as keyword to cast e.target to a more specific type!!!
        const i = Number((e.target as HTMLDivElement).id.substr(1));
        const v = bd[i].v;
        setAc({ v, i });
      }}
    >
      {bd.map((cell: CellType) => (
        <Cell cell={cell} key={cell.i} />
      ))}
    </div>
  );
}
