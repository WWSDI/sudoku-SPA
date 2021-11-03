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
  const getAllConflictCells = () => {
    const allCells = document.querySelectorAll(".Cell");
    const conflictCells: Element[] = Array.from(allCells).filter((cell) => {
      const cellIdx = idToIndex(cell.id);
      return bd[cellIdx].conflict.length > 0;
    });
    return conflictCells;
  };
  const hlConflict = () => {
    const allCells = document.querySelectorAll(".Cell");
    allCells.forEach((cell) => {
      if (bd[idToIndex(cell.id)].conflict.length > 0) {
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

    console.log("sudokuVal", getSudokuVals(sudoku));
    // hlConflict();
    // hlConflict(ac.i);
    // console.log("CELL:", bd[ac.i]);
  }, [bd, sudoku]); // ignore the dependency warning

  // add or remove ac.i from conflict cells
  useEffect(() => {
    // 感觉似乎是要使用到history功能才可以，因为要追踪之前的ac.v

    // 🌸 这个部分逻辑真的很难写。我应该写一些util函数，简化操作
    const acIdx = ac.i;
    const acVal = bd[acIdx].v;
    const getConflictCells = (activeCellIndex: number) => {};

    // 1. create conflictCells array
    const conflictCells = sudoku.filter((cell) => {
      const idx1 = idToIndex((cell as HTMLDivElement).id);
      const v1 = bd[idx1].v;
      console.log(v1, ac.v);
      const v2 = bd[ac.i].v;
      const type2 = bd[ac.i].type;
      return type2 === "user" && v1 === v2 && v1 !== 0;
    });
    console.log("😱", conflictCells);
    // 2. fill conflict array
    if (conflictCells.length > 1) {
      conflictCells.forEach((cell) => {
        const idx = idToIndex((cell as HTMLDivElement).id);
        // conflict cell is in conflict with ac, therefore, put ac.i into the cell's conflict array
        if (!bd[idx].conflict.includes(ac.i)) bd[idx].conflict.push(ac.i);
      });
    }

    console.log(bd);
    // 3. remove ac.i from conflict cells
    const allConflictCells = getAllConflictCells();
    allConflictCells.forEach((cell) => {
      const cellIdx = idToIndex((cell as HTMLDivElement).id);
      const cellVal = bd[cellIdx].v;

      const conArr = bd[cellIdx].conflict;
      conArr.forEach((conIdx, i, arr) => {
        const conCellVal = bd[conIdx].v;
        if (cellVal !== conCellVal || conCellVal === 0) {
          arr[i] = -1;
        }
        // 🐞🐞🐞
        // 加入这一个判断，专门用作去除和自身比较的情况
        // ⛔️ !!! 问题在于会取消自身高亮，即便在其他cell仍然高亮的时候
        // if (cellIdx === conIdx
        //   //
        //   && !getSudokuVals(sudoku).includes(cellVal)
        //   ) {
        //   arr[i] = -1;
        // }
      });
      // ⛔️ This could be the problem, as I don't think I should be changing the state directly without using dispatch
      bd[cellIdx].conflict = conArr.filter((v) => v >= 0);
    });
    console.log("😱", getAllConflictCells());

    // 4. highlight conflict cells
    hlConflict();
  }, [bd]);

  // 3. highlight conflict when bd chagnes
  useEffect(() => {
    if (didIWin()) setWon(true);
    // console.log("WON:", won);
    // every time bd changes, store bd, ac to localStorage
    localStorage.setItem("bd", JSON.stringify(bd));
    localStorage.setItem("ac", JSON.stringify(ac));
    // console.log(
    //   "🌸",
    //   "localStorage.ac:",
    //   localStorage.ac,
    //   "localStorage.bd:",
    //   localStorage.bd.substr(
    //     localStorage.bd.length - 41,
    //     localStorage.bd.length,
    //   ),
    // );
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
