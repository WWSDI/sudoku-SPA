import { NumpadProps } from "../lib/types";
import { Button } from "./Button";
import "./Numpad.css";

export default function Numpad({ bd, bdDispatch, ac, setAc, keypress, setKeypress }: NumpadProps) {
  return (
    <div
      className="Numpad"
      onClick={(e) => {
        const v = Number((e.target as HTMLDivElement).id);
        console.log(v, ac.v);
        setKeypress(true);
        setAc({ ...ac, v });
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Button key={num} id={num} />
      ))}
    </div>
  );
}
