import { CellType } from "../lib/types";
import "./Cell.css";

interface CellProps {
  cell: CellType;
}

interface DivProps{
  i?: number;
}

export default function Cell({
  cell: { v, i, type, error },
}: CellProps): JSX.Element {
  return (
    // <div className={v ? "Cell" : "Cell empty-Cell"} i={i}>
    <div className={v ? "Cell" : "Cell empty-Cell"}>
      {v ? v : ""}
    </div>
  );
}
