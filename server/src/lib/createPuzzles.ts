//const AllSolutions100: number[][] = require("../../../data/100solutions_1D.json");

import { SolutionModel } from "../models/SolutionModel";

// ❗️This needs to work with mongodb eventually
// const getSolutions = (
//   numSolutions: number,
//   AllSolutions: number[][],
// ): number[][] => {
//   const length = AllSolutions.length;
//   const solutions: number[][] = [];
//   for (let i = 0; i < numSolutions; i++) {
//     const oneSolution: number[] =
//       AllSolutions100[Math.floor(Math.random() * length)];
//     solutions.push(oneSolution);
//   }
//   return solutions;
// };

// console.log("😀", AllSolutions100.length, AllSolutions100[1]);

// ⭐️ Official difficulty
// const lookupDifficulty = {
//   easy: {
//     numZero: 35,
//   },
//   medium: {
//     numZero: 45,
//   },
//   hard: {
//     numZero: 55,
//   },
// };

// Testing difficulty
const lookupDifficulty = {
  test: {
    numZero: 10,
  },
  easy: {
    numZero: 35,
  },
  medium: {
    numZero: 45,
  },
  hard: {
    numZero: 55,
  },
  hell: {
    numZero: 60,
  },
};

const getRanSolutionsMongo = async (numSolutions: number) => {
  let solutions: number[][] = [];
  // Get the count of all users
  const count = await SolutionModel.count();
  // Get multiple sudoku solutions
  for (let i = 0; i < numSolutions; i++) {
    var ranNum = Math.floor(Math.random() * count);
    const { solution } = await SolutionModel.findOne().skip(ranNum);
    solutions.push(solution);
  }

  return solutions;
};

const nonrepeatRanNums = (ceil: number, numZero: number): number[] => {
  const zeroIndice: Set<number> = new Set();
  while (zeroIndice.size < numZero) {
    const index = Math.floor(Math.random() * ceil);
    zeroIndice.add(index);
  }

  return Array.from(zeroIndice).sort((a, b) => a - b);
};
type Difficulty = "test" | "easy" | "medium" | "hard" | "hell";
const createPuzzle = (
  sudokuSolution: number[],
  difficulty: Difficulty,
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

interface PuzzleSolution {
  puzzle: number[];
  solution: number[];
}
interface AllDifficultyPuzzleSolution {
  test: PuzzleSolution[];
  easy: PuzzleSolution[];
  medium: PuzzleSolution[];
  hard: PuzzleSolution[];
  hell: PuzzleSolution[];
}

const createPuzzleSolutionSets = (
  sudokuSolutions: number[][],
): AllDifficultyPuzzleSolution => {
  // const solutions = getRanSolutionsMongo(100);

  const numPuzzles = sudokuSolutions.length;
  const result: AllDifficultyPuzzleSolution = {
    test: [],
    easy: [],
    medium: [],
    hard: [],
    hell: [],
  };

  const allDifficulty: ["test", "easy", "medium", "hard", "hell"] = [
    "test",
    "easy",
    "medium",
    "hard",
    "hell",
  ];

  allDifficulty.forEach((difficulty: Difficulty) => {
    for (let i = 0; i < numPuzzles; i++) {
      const puzzle = createPuzzle(sudokuSolutions[i], difficulty);
      const solution = sudokuSolutions[i];
      const puzzleSolution: PuzzleSolution = {
        puzzle,
        solution,
      };
      result[difficulty].push(puzzleSolution);
    }
  });

  return result;
};

module.exports = { createPuzzleSolutionSets, getRanSolutionsMongo };

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
