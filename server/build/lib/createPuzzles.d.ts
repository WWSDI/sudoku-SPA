declare const AllSolutions100: number[][];
declare const getSolutions: (numSolutions: number, AllSolutions: number[][]) => number[][];
declare const lookupDifficulty: {
    easy: {
        numZero: number;
    };
    medium: {
        numZero: number;
    };
    hard: {
        numZero: number;
    };
};
declare const nonrepeatRanNums: (ceil: number, numZero: number) => number[];
declare type Difficulty = "easy" | "medium" | "hard";
declare const createPuzzle: (sudokuSolution: number[], difficulty: Difficulty) => number[];
interface PuzzleSolution {
    puzzle: number[];
    solution: number[];
}
interface AllDifficultyPuzzleSolution {
    easy: PuzzleSolution[];
    medium: PuzzleSolution[];
    hard: PuzzleSolution[];
}
declare const getPuzzleSolution: (sudokuSolutions: number[][]) => AllDifficultyPuzzleSolution;
declare const solutions_10: number[][];
declare const puzzleSolutions: AllDifficultyPuzzleSolution;
