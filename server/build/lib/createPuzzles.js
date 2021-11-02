"use strict";
// import getSolutions from "./getSolutions";
var AllSolutions100 = require("../../../data/100solutions_1D.json");
// const AllSolutions100 = require("../data");
console.log("😀", AllSolutions100.length, AllSolutions100[1]);
var getSolutions = function (numSolutions, AllSolutions) {
    var length = AllSolutions.length;
    var solutions = [];
    for (var i = 0; i < numSolutions; i++) {
        var oneSolution = AllSolutions100[Math.floor(Math.random() * length)];
        solutions.push(oneSolution);
    }
    return solutions;
};
module.exports = getSolutions;
var lookupDifficulty = {
    easy: {
        numZero: 40,
    },
    medium: {
        numZero: 50,
    },
    hard: {
        numZero: 60,
    },
};
var nonrepeatRanNums = function (ceil, numZero) {
    var zeroIndice = new Set();
    while (zeroIndice.size < numZero) {
        var index = Math.floor(Math.random() * ceil);
        zeroIndice.add(index);
    }
    return Array.from(zeroIndice).sort(function (a, b) { return a - b; });
};
var createPuzzle = function (sudokuSolution, difficulty) {
    var numZero = lookupDifficulty[difficulty].numZero;
    var zeroIndice = nonrepeatRanNums(sudokuSolution.length, numZero);
    var puzzle = sudokuSolution.map(function (num, i) {
        if (zeroIndice.includes(i)) {
            return 0;
        }
        else
            return num;
    });
    return puzzle;
};
var getPuzzleSolution = function (sudokuSolutions) {
    var numPuzzles = sudokuSolutions.length;
    var result = {
        easy: [],
        medium: [],
        hard: [],
    };
    var allDifficulty = ["easy", "medium", "hard"];
    allDifficulty.forEach(function (difficulty) {
        for (var i = 0; i < numPuzzles; i++) {
            var puzzle = createPuzzle(sudokuSolutions[i], difficulty);
            var solution = sudokuSolutions[i];
            var puzzleSolution = {
                puzzle: puzzle,
                solution: solution,
            };
            result[difficulty].push(puzzleSolution);
        }
    });
    return result;
};
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
var solutions_10 = getSolutions(10, AllSolutions100);
console.log("👹", solutions_10);
var puzzleSolutions = getPuzzleSolution(solutions_10);
console.log("👹", puzzleSolutions);
