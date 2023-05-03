import { Difficulty, PuzzleSet } from "./types";

export const fetchPuzzleSet = async (difficulty: Difficulty) => {
  // console.log(`fetching puzzles from ${process.env.REACT_APP_API_URI}/puzzles`);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/puzzles/${difficulty}`
    );
    // console.log(response.status);
    if (response.ok) {
      const puzzleSet: PuzzleSet = await response.json();
      console.log("🌈 new puzzle set fetched successfully", puzzleSet);
      return puzzleSet;
    } else {
      alert("⚠️ Error: fetching puzzle set not successful");
    }
  } catch (e) {
    console.log(e);
  }
};

export const storeFetchedPuzzles = (puzzleSet: PuzzleSet) => {
  localStorage.setItem(
    `puzzles-${puzzleSet.difficulty}`,
    JSON.stringify(puzzleSet.difficulty)
  );
};
