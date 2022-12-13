import { Request, Response } from "express";
const express = require("express");
const app = express();
const { getRanSolution, getPuzzleSet } = require("./lib/createPuzzles");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// GET 1 puzzle set, send to the client and to be saved in local storage
app.get("/puzzles/:difficulty", async (req: Request, res: Response) => {
  // 1. get one random solution
  const solution = await getRanSolution();

  // 2. create puzzles based on the solution and chosen difficulty
  const puzzleSet = getPuzzleSet(solution, req.params.difficulty);

  // 3. send puzzle set to the client
  res.send(puzzleSet);
});

module.exports = app;
