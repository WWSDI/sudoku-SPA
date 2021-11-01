import Cell from "./Cell";
import "./Board.css";
import { CellType, BdType, BoardProps } from "../lib/types";
import { useEffect } from "react";
import { idToIndex, idxToij, indexToSelector } from "../util/util";

// Highlighting

export default function Board({
  bd,
  bdDispatch,
  ac,
  setAc,
  keypress,
  setKeypress,
}: BoardProps): JSX.Element {
  const removeHl = () => {
    const allCells = document.querySelectorAll(".Cell");
    allCells.forEach((cell) => {
      cell.classList.remove("hl-sudoku", "hl-ac", "hl-same-num");
    });
  };
  // ❗️❗️ may have to use useCallback
  // The 'hlSudokuSamenumAC' function makes the dependencies of useEffect Hook (at line 67) change on every render. Move it inside the useEffect callback. Alternatively, wrap the definition of 'hlSudokuSamenumAC' in its own useCallback() Hook.eslintreact-hooks/exhaustive-deps
  const hlSudokuSamenumAC = (idx: number) => {
    // ❗️ This part can be optimised by using a lookup obj instead of calculating every time
    const [i, j] = idxToij(idx);
    const blcIStart = Math.floor(i / 3) * 3;
    const blcJStart = Math.floor(j / 3) * 3;
    const allCells = document.querySelectorAll(".Cell");
    const AC = document.querySelector(indexToSelector(idx));
    const ACVal = bd[idx].v;

    function hlAC(idx: number) {
      AC?.classList.add("hl-ac");
    }
    // Create same num array and sudoku array
    const sameNumCells: Element[] = [];
    const sudoku = Array.from(allCells).filter((cell) => {
      // console.log("CELL:", cell);
      const idx = idToIndex((cell as HTMLDivElement).id);
      const [m, n] = idxToij(idx);
      // push all same num cells to the array
      const v = bd[idx].v;
      if (v !== 0 && v === ACVal) sameNumCells.push(cell);

      return (
        m === i ||
        n === j ||
        (m >= blcIStart &&
          m < blcIStart + 3 &&
          n >= blcJStart &&
          n < blcJStart + 3)
      );
    });

    const conflictCells: Element[] = sudoku.filter((cell) => {
      const idx = idToIndex((cell as HTMLDivElement).id);
      const v = bd[idx].v;
      return v !== 0 && v === ac.v;
    });

    // 1. highlight sudoku
    sudoku.forEach((cell) => cell.classList.add("hl-sudoku"));
    // 2. highlight same num
    sameNumCells.forEach((cell) => cell.classList.add("hl-same-num"));
    // 3. highlight AC
    hlAC(idx);
    // 4. highlight conflict cells
    conflictCells.forEach((cell) => cell.classList.add("hl-conflict"));
  };

  useEffect(() => {
    // ✅ TODO: change hl when ac changes
    // console.log("🤖", document.querySelector("#C19"));
    removeHl();
    hlSudokuSamenumAC(ac.i);
  }, [ac, hlSudokuSamenumAC]);

  useEffect(() => {
    // TODO: change css for cells based on cell type when bd changes
    console.log("ac.v:", ac.v);
    bdDispatch({ type: "SET_AC", payload: { ...ac } });
    // 1. hl conflict cells

    // 2. hl error (AC could be error if in conflict of )
    // 3. change bd based on ac
    return () => {
      setKeypress(false);
    };
  }, [ac, bdDispatch, keypress, setKeypress]);

  return (
    <div
      className="Board"
      id="Board"
      onClick={(e) => {
        // 👹👹👹 use as keyword to cast e.target to a more specific type!!!
        console.log("Cell index:", (e.target as HTMLInputElement).id);
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
