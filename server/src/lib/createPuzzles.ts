import { SolutionModel } from "../models/SolutionModel";
import { nonrepeatRanNums } from "../utils/math";

// Testing difficulty
const lookupDifficulty = {
  testing: {
    numZero: 3,
  },
  easy: {
    numZero: 25,
  },
  medium: {
    numZero: 40,
  },
  hard: {
    numZero: 55,
  },
  hell: {
    numZero: 60,
  },
};

const getRanSolution = async () => {
  // 1. Get the count of all users
  const count = await SolutionModel.count();
  // 2. Get multiple sudoku solutions
  var ranNum = Math.floor(Math.random() * count);
  const { solution } = await SolutionModel.findOne().skip(ranNum);
  // 3.
  return solution;
};

type Difficulty = "testing" | "easy" | "medium" | "hard" | "hell";

const createPuzzle = (
  sudokuSolution: number[],
  difficulty: Difficulty
): number[] => {
  const { numZero } = lookupDifficulty[difficulty];

  const zeroIndice = nonrepeatRanNums(sudokuSolution.length, numZero);

  const puzzle = sudokuSolution.map((num, i) => {
    if (zeroIndice.includes(i)) {
      return 0;
    } else return num;
  });

  return puzzle;
};

interface PuzzleSet {
  puzzle: number[];
  solution: number[];
  difficulty: Difficulty;
}

const getPuzzleSet = (
  solution: number[],
  difficulty: Difficulty
): PuzzleSet => {
  const puzzle = createPuzzle(solution, difficulty);
  const puzzleSet = { puzzle, solution, difficulty };

  return puzzleSet;
};

module.exports = { getPuzzleSet, getRanSolution };

// 🧪🧪🧪 TESTING
// console.log(arr1.length, arr1);
// const sampleSolution1 = [
// 8, 3, 5, 6, 4, 2, 1, 7, 9, 9, 7, 4, 8, 3, 1, 2, 6, 5, 1, 2, 6, 5, 7, 9, 4, 8,
// 3, 6, 1, 3, 7, 9, 8, 5, 4, 2, 4, 5, 8, 2, 6, 3, 7, 9, 1, 2, 9, 7, 1, 5, 4, 6,
// 3, 8, 7, 8, 2, 9, 1, 6, 3, 5, 4, 5, 4, 9, 3, 2, 7, 8, 1, 6, 3, 6, 1, 4, 8, 5,
// 9, 2, 7,
// ];

// count num of zeros in an array
// const countZeros = (arr: number[]): number => {
//   return arr.filter((num) => num === 0).length;
// };
// const puzzle1 = createPuzzle(sampleSolution1, "easy");
// console.log(puzzle1, countZeros(puzzle1));

// ============
// const solutions_10 = getSolutions(10, AllSolutions100);
// console.log("👹", solutions_10);

// const puzzleSolutions = getPuzzleSolution(solutions_10);

// console.log("👹", puzzleSolutions);
// console.log("👹", puzzleSolutions.easy);
// console.log("👹", puzzleSolutions.easy[0]);
