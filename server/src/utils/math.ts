export const nonrepeatRanNums = (ceil: number, numZero: number): number[] => {
  const zeroIndice: Set<number> = new Set();
  while (zeroIndice.size < numZero) {
    const index = Math.floor(Math.random() * ceil);
    zeroIndice.add(index);
  }

  return Array.from(zeroIndice).sort((a, b) => a - b);
};
