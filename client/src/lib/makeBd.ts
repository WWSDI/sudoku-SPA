import { CellType } from "./types";

const makeCell = (v: number, i: number): CellType => ({
  v,
  i,
  type: v !== 0 ? "auto" : "user",
  error: false,
  conflict: false,
});
const makeBd = (puzzle: number[]) => puzzle.map(makeCell);

export default makeBd;
