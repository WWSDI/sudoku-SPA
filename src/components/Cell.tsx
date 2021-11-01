import { CellType } from "../lib/types";
import "./Cell.css";

interface CellProps {
  cell: CellType;
}

// interface DivProps {
//   i?: number;
// }

export default function Cell({ cell: { v, i, type, error } }: CellProps) {
  return (
    // <div className={v ? "Cell" : "Cell empty-Cell"} i={i}>
    <div
      className={type === "auto" ? "Cell auto" : "Cell user"}
      id={"C" + String(i).padStart(2, "0")}
    >
      {v ? v : ""}
    </div>
  );
}
