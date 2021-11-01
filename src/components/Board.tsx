import Cell from "./Cell";
import "./Board.css";
import { CellType, BdType, BoardProps } from "../lib/types";
import { useEffect } from "react";

// UTILITIES
// ⭐️ convert idx to [i,j]
const idxToij = (idx: number): [number, number] => {
  return [Math.floor(idx / 9), idx % 9];
};
const hlCell = (idx: number) => {
  const AC = document.querySelector(`#C${idx}`);
  AC?.classList.add("hl-ac");
};
const cancelHl = () => {
  const cellList = document.querySelectorAll(".Cell");
  cellList.forEach((cell) => {
    cell.classList.remove("hl-sudoku");
    // cell.classList.remove("hl-sudoku")
    // cell.classList.remove("hl-sudoku")
  });
};
const hlSudoku = (idx: number) => {
  // const idx = e.target.attributes.idx.value;
  // create another function to highlight RCB based on active cell
  const [rowI, colJ] = idxToij(idx);
  const blcIStart = Math.floor(rowI / 3) * 3;
  const blcJStart = Math.floor(colJ / 3) * 3;

  const cellList = document.querySelectorAll(".Cell");
  const rowColBlc = Array.from(cellList).filter((cell) => {
    // console.log("CELL:", cell);
    const [i, j] = idxToij(Number((cell as HTMLDivElement).id.substr(1)));
    return (
      i === rowI ||
      j === colJ ||
      (i >= blcIStart &&
        i < blcIStart + 3 &&
        j >= blcJStart &&
        j < blcJStart + 3)
    );
  });

  // console.log(rowColBlc);
  rowColBlc.forEach((cell) => cell.classList.add("hl-sudoku"));
  // hlCell();
};

export default function Board({
  bd,
  bdDispatch,
  ac,
  setAc,
}: BoardProps): JSX.Element {
  useEffect(() => {
    //TODO: change hl when ac changes
    console.log("🤖", document.querySelector("#C19"));
    cancelHl();
    hlSudoku(ac.i);
    hlCell(ac.i);
    //bdDispatch();
  }, [ac]);

  useEffect(() => {
    // TODO: change css for cells based on cell type when bd changes
  }, [bd]);

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
