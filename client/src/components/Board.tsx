import Cell from "./Cell";
import "./Board.css";
import { CellType, BdType, BoardProps } from "../lib/types";
import { useEffect, useState } from "react";
import { getSudoku, idToIndex, idxToij, indexToSelector } from "../util/util";
import makeBd from "../lib/makeBd";

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
    for (let cell of bd) {
      if (cell.v === 0 || cell.error === true) return false;
    }
    return true;
  };

  // 1. update sudoku
  useEffect(() => {
    setSudoku(getSudoku(ac.i));
  }, [ac]);

  // add or remove ac.i from conflict cells
  useEffect(() => {
    // 1. add ac.i to conflict cells


    // console.log("bd[idx].v", bd[idx].v, "ac.v", ac.v);

    // 2. remove ac.i from conflict cells
    // 感觉似乎是要使用到history功能才可以，因为要追踪之前的ac.v

    // create conflictCells array
    const conflictCells = sudoku.filter((cell) => {
      const idx1 = idToIndex((cell as HTMLDivElement).id);
      const v1 = bd[idx1].v;
      console.log(v1, ac.v);
      const v2 = bd[ac.i].v;
      const type2 = bd[ac.i].type;
      return type2 === "user" && v1 === v2 && v1 !== 0;
    });
    console.log("😱", conflictCells);
    // fill conflict array
    conflictCells.forEach((cell) => {
      const idx = idToIndex((cell as HTMLDivElement).id);
      // conflict cell is in conflict with ac, therefore, put ac.i into the cell's conflict array
      if (!bd[idx].conflict.includes(ac.i)) bd[idx].conflict.push(ac.i);
    });
    console.log("😱", getAllConflictCells());
    console.log(bd);
    // remove ac.i from conflict cells
    const allConflictCells = getAllConflictCells();
    allConflictCells.forEach((cell) => {
      const idx = idToIndex((cell as HTMLDivElement).id);
      const cellVal = bd[idx].v;

      const conArr = bd[idx].conflict;
      conArr.forEach((conIdx, i, arr) => {
        const conCellVal = bd[conIdx].v;
        if (cellVal !== conCellVal || conCellVal === 0) {
          arr[i] = -1;
        }
      });
      bd[idx].conflict = conArr.filter((v) => v >= 0);
    });

    hlConflict();
  }, [bd]);

  // 2. highlight sudoku, ac, same num
  useEffect(() => {
    // remove highlight of sudoku, ac and same num
    remove3Hl();
    // add new highlight of sudoku, ac and same num
    hlSudoku(ac.i);
    hlSameNum(ac.i);
    hlAC(ac.i);
    // hlConflict();
    // hlConflict(ac.i);
    // console.log("CELL:", bd[ac.i]);
  }, [bd, sudoku]); // ignore the dependency warning

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
