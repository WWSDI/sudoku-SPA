import { NumpadProps } from "../lib/types";
import { Button } from "./Button";
import "./Numpad.css";

export default function Numpad({ bd, bdDispatch, ac, setAc }: NumpadProps) {
  return (
    <div
      className="Numpad"
      onClick={(e) => {
        //console.log("e: ", target.attributes.num.value);
        const v = Number((e.target as HTMLDivElement).id);
        setAc({ ...ac, v });
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Button key={num} id={num} />
      ))}
    </div>
  );
}
