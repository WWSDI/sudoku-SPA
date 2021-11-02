import { Request, Response } from "express";
const express = require("express");
const app = express();
const {
  getRanSolutionsMongo,
  createPuzzleSolutionSets,
} = require("./lib/createPuzzles");
const cors = require("cors");

app.use(cors())
app.use(express.json());

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// GET 10 puzzles for each difficulty, send to the client and to be saved in local storage
app.get("/puzzles", async (req: Request, res: Response) => {
  // 1. get 10 solutions from the data folder
  // let solutions: number[] = [];
  // const count = await SolutionModel.count();

  // for (let i = 0; i < 10; i++) {
  //   var ranNum = Math.floor(Math.random() * count);
  //   console.log("COUNT:", count, ranNum);
  //   const { solution } = await SolutionModel.findOne().skip(ranNum);
  //   solutions.push(solution);
  // }
  const solutions = await getRanSolutionsMongo(10);
  console.log(solutions);

  // 2. create puzzles based on the solutions
  const result = createPuzzleSolutionSets(solutions);

  // 3. send the puzzles & solutions to the client

  res.send({ solutions: result });
});

module.exports = app;
