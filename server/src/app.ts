import { Request, Response } from "express";
const express = require("express");
const app = express();
const {
  getRanSolutionsMongo,
  createPuzzleSolutionSets,
} = require("./lib/createPuzzles");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// GET 10 puzzles for each difficulty, send to the client and to be saved in local storage
app.get("/puzzles", async (req: Request, res: Response) => {
  const solutions = await getRanSolutionsMongo(3);
  if (solutions) console.log("sending fetched solutions to client", solutions);

  // 2. create puzzles based on the solutions
  const result = createPuzzleSolutionSets(solutions);

  // 3. send the puzzles & solutions to the client
  res.send({ puzzles: result });
});

module.exports = app;
