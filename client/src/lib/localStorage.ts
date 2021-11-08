import { Puzzles, Difficulty } from "./types";

export const fetchPuzzles = async () => {
  console.log(`fetching puzzles from ${process.env.REACT_APP_API_URI}/puzzles`);
  try {
    const response = await fetch(`https://sudoku-spa.herokuapp.com/puzzles`);
    console.log(response.status);
    if (response.ok) {
      const puzzles: Puzzles = await response.json();
      console.log("🌈 new puzzles fetched", puzzles);
      return puzzles;
    } else {
      alert("Error: fetching puzzles not successful");
    }
  } catch (e) {
    console.log(e);
  }
};

export const storeFetchedPuzzles = (puzzles: Puzzles) => {
  ["test", "easy", "medium", "hard", "hell"].forEach((difficulty) => {
    localStorage.setItem(
      `puzzles-${difficulty}`,
      JSON.stringify(puzzles.puzzles[difficulty as Difficulty]),
    );
  });
};
