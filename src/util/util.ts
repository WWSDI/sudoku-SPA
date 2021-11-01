// ⭐️ convert index to [i,j]
export const idxToij = (idx: number): [number, number] => [
  Math.floor(idx / 9),
  idx % 9,
];

// Formatting
export const indexToSelector = (index: number) =>
  "#C" + String(index).padStart(2, "0");

export const idToIndex = (id: string) => parseInt(id.substr(1));
