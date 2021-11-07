export type AC = { i: number; v: number };

export type CellType = {
  v: number;
  i: number;
  type: "auto" | "user";
  error: boolean;
  conflict: boolean; // index of cells that are conflicting
};
export type BdType = CellType[];
export type actionType = {
  type: string;
  payload: {
    i?: number;
    v?: number;
    type?: "auto" | "user";
    bd?: BdType;
  };
};
export interface BoardProps {
  bd: BdType;
  bdDispatch: React.Dispatch<actionType>;
  ac: AC;
  setAc: React.Dispatch<
    React.SetStateAction<{
      i: number;
      v: number;
    }>
  >;
  keypress: boolean;
  setKeypress: React.Dispatch<React.SetStateAction<boolean>>;
  won: boolean;
  setWon: React.Dispatch<React.SetStateAction<boolean>>;
  puzzle: number[];
  setPuzzle: React.Dispatch<React.SetStateAction<number[]>>;
  solution: number[];
  setSolution: React.Dispatch<React.SetStateAction<number[]>>;
}
export interface NumpadProps extends BoardProps {}

export type Puzzle = {
  puzzle: number[];
  solution: number[];
};
export type Puzzles = {
  puzzles: {
    test: Puzzle[];
    easy: Puzzle[];
    medium: Puzzle[];
    hard: Puzzle[];
    hell: Puzzle[];
  };
};
export type Difficulty = "test" | "easy" | "medium" | "hard" | "hell";
