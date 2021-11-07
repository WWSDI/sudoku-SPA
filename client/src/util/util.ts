import { CellType } from "./../lib/types";
import { BdType } from "../lib/types";

// ⭐️ convert index to [i,j]
export const idxToij = (idx: number): [number, number] => [
  Math.floor(idx / 9),
  idx % 9,
];
export const getSudoku = (idx: number) => {
  // ❗️ This part can be optimised by using a lookup obj instead of calculating every time
  const [i, j] = idxToij(idx);
  const blcIStart = Math.floor(i / 3) * 3;
  const blcJStart = Math.floor(j / 3) * 3;
  const allCells = document.querySelectorAll(".Cell");
  const sudoku = Array.from(allCells).filter((cell) => {
    // console.log("CELL:", cell);
    const idx = idToIndex((cell as HTMLDivElement).id);
    const [m, n] = idxToij(idx);

    return (
      m === i ||
      n === j ||
      (m >= blcIStart &&
        m < blcIStart + 3 &&
        n >= blcJStart &&
        n < blcJStart + 3)
    );
  });
  return sudoku;
};
export const getSudokuIndices = (idx: number) => {
  // ❗️ This part can be optimised by using a lookup obj instead of calculating every time
  const [i, j] = idxToij(idx);
  const blcIStart = Math.floor(i / 3) * 3;
  const blcJStart = Math.floor(j / 3) * 3;

  const sudoku = Array.from({ length: 81 }, (_, i) => i).filter((idx) => {
    // console.log("CELL:", cell);
    const [m, n] = idxToij(idx);

    return (
      m === i ||
      n === j ||
      (m >= blcIStart &&
        m < blcIStart + 3 &&
        n >= blcJStart &&
        n < blcJStart + 3)
    );
  });
  return sudoku;
};

// Formatting
export const indexToSelector = (index: number) =>
  "#C" + String(index).padStart(2, "0");

export const idToIndex = (id: string) => parseInt(id.substr(1));

export const get2DSolutionFromBd = (bd: BdType) => {
  const solution1D = bd.map((cell: CellType) => cell.v);
  const solution2D: number[][] = Array.from({ length: 9 }, () => []);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      solution2D[i].push(solution1D[i * 9 + j]);
    }
  }
  return solution2D;
};