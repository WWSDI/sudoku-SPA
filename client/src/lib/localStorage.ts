import { Puzzles, Difficulty } from "./types";

export const fetchPuzzles = async () => {
  const response = await fetch("http://localhost:5005/puzzles");
  if (response.ok) {
    const puzzles: Puzzles = await response.json();
    console.log("🌈 new puzzles fetched", puzzles);
    return puzzles;
  } else {
    alert("Error: fetching puzzles not successful");
  }
};

export const storeFetchedPuzzles = (puzzles: Puzzles) => {
  ["easy", "medium", "hard"].forEach((difficulty) => {
    localStorage.setItem(
      `puzzles-${difficulty}`,
      JSON.stringify(puzzles.puzzles[difficulty as Difficulty]),
    );
  });
};
