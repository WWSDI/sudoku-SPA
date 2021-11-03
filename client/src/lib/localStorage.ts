type Puzzle = {
  puzzle: number[];
  solution: number[];
};
type Puzzles = {
  puzzles: {
    easy: Puzzle[];
    medium: Puzzle[];
    hard: Puzzle[];
  };
};
type Difficulty = "easy" | "medium" | "hard";

export const storeFetchedPuzzles = (puzzles: Puzzles) => {
  ["easy", "medium", "hard"].forEach((difficulty) => {
    localStorage.setItem(
      `puzzles-${difficulty}`,
      JSON.stringify(puzzles.puzzles[difficulty as Difficulty]),
    );
  });
};
