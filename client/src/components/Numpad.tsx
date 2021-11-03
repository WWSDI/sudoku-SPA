import { NumpadProps } from "../lib/types";
import { Button } from "./Button";
import "./Numpad.css";

export default function Numpad({
  bd,
  bdDispatch,
  ac,
  setAc,
  keypress,
  setKeypress,
}: NumpadProps) {
  return (
    <div
      className="Numpad"
      onClick={(e) => {
        // the id is of the same value as the number button
        const numVal = Number((e.target as HTMLDivElement).id);
        console.log("Number button value:", numVal, "ac.v:", ac.v);
        setKeypress(true);

        bdDispatch({ type: "SET_CELL_VALUE", payload: { v: numVal } });
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Button key={num} id={num} />
      ))}
    </div>
  );
}
