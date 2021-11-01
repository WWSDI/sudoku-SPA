import Cell from "./Cell";
import "./Board.css";
import { CellType, BdType, BoardProps } from "../lib/types";
import { useEffect } from "react";

// UTILITIES
// ⭐️ convert idx to [i,j]
const idxToij = (idx: number): [number, number] => {
  return [Math.floor(idx / 9), idx % 9];
};
// const hlCell = (e) => {
//   e.target.classList.toggle("hl-cell");
// };

// const hlSudoku = (idx: number) => {
//   // console.log(e.target);
//   // const idx = e.target.attributes.idx.value;
//   // create another function to highlight RCB based on active cell
//   const [rowI, colJ] = idxToij(idx);
//   const blcIStart = Math.floor(rowI / 3) * 3;
//   const blcJStart = Math.floor(colJ / 3) * 3;

//   const cellList = document.querySelectorAll(".Cell");
//   const rowColBlc = Array.from(cellList).filter((cell) => {
//     const [i, j] = idxToij(cell.attributes.idx.value);
//     return (
//       i === rowI ||
//       j === colJ ||
//       (i >= blcIStart &&
//         i < blcIStart + 3 &&
//         j >= blcJStart &&
//         j < blcJStart + 3)
//     );
//   });

//   // console.log(rowColBlc);
//   rowColBlc.forEach((cell) => cell.classList.toggle("hl-sudoku"));
//   // hlCell();
// };

export default function Board({
  bd,
  bdDispatch,
  ac,
  setAc,
}: BoardProps): JSX.Element {
  useEffect(() => {
    //TODO: change hl when ac changes
    //hlSudoku();
    //bdDispatch();
  }, [ac, bdDispatch]);

  useEffect(() => {
    // TODO: change css for cells based on cell type when bd changes
  }, [bd]);

  return (
    <div
      className="Board"
      onClick={
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          console.log(e.target)
        //setAc(e.target.attributes.idx.value)
      }
    >
      {bd.map((cell: CellType) => (
        <Cell cell={cell} key={cell.i} />
      ))}
    </div>
  );
}
