"use strict";
//const AllSolutions100: number[][] = require("../../../data/100solutions_1D.json");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var SolutionModel_1 = require("../models/SolutionModel");
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
// Official difficulty
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
var lookupDifficulty = {
    easy: {
        numZero: 10,
    },
    medium: {
        numZero: 20,
    },
    hard: {
        numZero: 30,
    },
};
var getRanSolutionsMongo = function (numSolutions) { return __awaiter(void 0, void 0, void 0, function () {
    var solutions, count, i, ranNum, solution;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                solutions = [];
                return [4 /*yield*/, SolutionModel_1.SolutionModel.count()];
            case 1:
                count = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < numSolutions)) return [3 /*break*/, 5];
                ranNum = Math.floor(Math.random() * count);
                return [4 /*yield*/, SolutionModel_1.SolutionModel.findOne().skip(ranNum)];
            case 3:
                solution = (_a.sent()).solution;
                solutions.push(solution);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, solutions];
        }
    });
}); };
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
var createPuzzleSolutionSets = function (sudokuSolutions) {
    // const solutions = getRanSolutionsMongo(100);
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
module.exports = { createPuzzleSolutionSets: createPuzzleSolutionSets, getRanSolutionsMongo: getRanSolutionsMongo };
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
