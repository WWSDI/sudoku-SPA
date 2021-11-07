import { Puzzles, Difficulty } from "./types";

export const fetchPuzzles = async () => {
  console.log(`fetching puzzles from ${process.env.API_URL}/puzzles`)
  const response = await fetch(`${process.env.API_URL}/puzzles`);
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
