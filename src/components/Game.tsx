import { useReducer, useState } from "react";
import { AC, actionType, BdType, CellType } from "../lib/types";
import Board from "./Board";
import BoardController from "./BoardController";
import GameController from "./GameController";
import Numpad from "./Numpad";

const initBdVal = [
  0, 1, 0, 0, 6, 4, 0, 3, 8, 0, 4, 9, 0, 7, 3, 5, 1, 6, 0, 0, 8, 0, 1, 2, 0, 9,
  0, 0, 0, 7, 4, 3, 6, 0, 5, 2, 5, 0, 3, 0, 9, 8, 6, 4, 0, 4, 0, 6, 2, 5, 1, 9,
  7, 3, 0, 0, 4, 1, 0, 7, 0, 2, 0, 3, 0, 2, 6, 4, 9, 1, 8, 7, 8, 0, 1, 3, 0, 5,
  4, 6, 0,
];
const makeBd = (v: number, i: number): CellType => ({
  v,
  i,
  type: v !== 0 ? "auto" : "user",
  error: false,
});
const initBd: BdType = initBdVal.map(makeBd);

// const initHl =[]
// const hlReducer = (hl: number[], action: actionType) => {
//   switch (action.type) {
//     case "set":
//       return hl;
//     default:
//       throw new Error("Unhandled action type: " + action.type);
//   }
// };

export default function Game() {
  const [ac, setAc] = useState<AC>({ i: 0, v: 0 });
  // keypress state is for solving the click ac and the user filled number disappear bug; delete this if no longer userful 
  const [keypress, setKeypress] = useState<boolean>(false);
  // bd is state
  // 🔨
  const bdReducer = (bd: BdType, action: actionType) => {
    switch (action.type) {
      case "SET_AC":
        const newBd = [...bd];
        const i = action.payload.i;

        if (i !== undefined) {
          newBd[i] = { ...bd[i] };
          if (bd[i].type === "user") {
            // newBd[i].v = ac.v;
            if (bd[i].v !== ac.v) newBd[i].v = ac.v;
            else if(keypress && bd[i].v === ac.v ) newBd[i].v = 0;
          }
        }
        return newBd;
      default:
        throw new Error("Unhandled action type: " + action.type);
    }
  };
  const [bd, bdDispatch] = useReducer(bdReducer, initBd);
  // const [hl, hlDispatch] = useReducer(hlReducer, initHl);
  return (
    <div className="game">
      <GameController />
      <Board
        bd={bd}
        bdDispatch={bdDispatch}
        ac={ac}
        setAc={setAc}
        keypress={keypress}
        setKeypress={setKeypress}
      />
      <Numpad
        bd={bd}
        bdDispatch={bdDispatch}
        ac={ac}
        setAc={setAc}
        keypress={keypress}
        setKeypress={setKeypress}
      />
    </div>
  );
}
