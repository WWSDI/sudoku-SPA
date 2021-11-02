import Cell from "./Cell";
import "./Board.css";
import { CellType, BdType, BoardProps } from "../lib/types";
import { useEffect, useState } from "react";
import { getSudoku, idToIndex, idxToij, indexToSelector } from "../util/util";

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
  const hlConflict = (idx: number) => {
    // create conflictCells array
    const conflictCells: Element[] = sudoku.filter((cell) => {
      const idx = idToIndex((cell as HTMLDivElement).id);
      const v = bd[idx].v;
      return v !== 0 && v === ac.v;
    });

    // highlight conflict cells
    conflictCells.forEach((cell) => cell.classList.add("hl-conflict"));
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

  // 2. highlight sudoku, ac, same num
  useEffect(() => {
    // remove highlight of sudoku, ac and same num
    remove3Hl();
    // add new highlight of sudoku, ac and same num
    hlSudoku(ac.i);
    hlSameNum(ac.i);
    hlAC(ac.i);
    console.log("CELL:", bd[ac.i]);
  }, [bd, sudoku]); // ignore the dependency warning

  // 3. highlight same num, conflict when bd chagnes
  useEffect(() => {
    if (didIWin()) setWon(true);
    console.log("WON:",won);
  }, [bd, won]);

  // 😱😱😱 之前的版本，暂时不用
  // useEffect(() => {
  //   // TODO: change css for cells based on cell type when bd changes
  //   console.log("ac.v:", ac.v);
  //   bdDispatch({ type: "SET_AC", payload: { ...ac } });
  //   // 1. hl conflict cells

  //   // 2. hl error (AC could be error if in conflict of )
  //   // 3. change bd based on ac
  //   return () => {
  //     setKeypress(false);
  //   };
  // }, [ac, bdDispatch, keypress, setKeypress]);

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
