
export type AC = { i: number; v: number };

export type CellType = {
  v: number;
  i: number;
  type: "auto" | "user";
  error: boolean;
};
export type BdType = CellType[];
export type actionType = {
  type: string;
  payload: {
    v?: number;
    type?: "auto" | "user";
  };
};
export type BoardProps = {
  bd: BdType;
  bdDispatch: React.Dispatch<actionType>;
  ac: AC;
  setAc: React.Dispatch<
    React.SetStateAction<{
      i: number;
      v: number;
    }>
  >;
};
