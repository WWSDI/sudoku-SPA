import { useReducer, useState } from "react";
import { actionType, BdType, CellType } from "../lib/types";
import  Board  from "./Board";
import BoardController from "./BoardController";
import GameController from "./GameController";

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
// bd is state
// 🔨
const bdReducer = (bd: BdType, action: actionType) => {
  switch (action.type) {
    case "set":
      return bd;
    default:
      throw new Error("Unhandled action type: " + action.type);
  }
};
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
  const [ac, setAc] = useState({ i: 0, v: 0 });
  const [bd, bdDispatch] = useReducer(bdReducer, initBd);
  // const [hl, hlDispatch] = useReducer(hlReducer, initHl);
  return (
    <div className="game">
      <GameController />
      <Board bd={bd} bdDispatch={bdDispatch} ac={ac} setAc={setAc} />
      <BoardController />
    </div>
  );
}
