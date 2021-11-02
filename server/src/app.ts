import { Request, Response } from "express";
const express = require("express");
const app = express();
const getSolutions = require("./lib/getSolutions");

app.use(express.json());

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// GET 10 puzzles for each difficulty, send to the client and to be saved in local storage
app.get("/puzzles", (req: Request, res: Response) => {
  // 1. get 10 solutions from the data folder
  const solutions = getSolutions(10);

  // 2. create puzzles based on the solutions

  // 3. send the puzzles & solutions to the client

  res.send("sudoku solutions are coming!");
});

module.exports = app;
