import { Request, Response } from "express";
const express = require("express");
const app = express();

app.use(express.json());

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/solutions", (req: Request, res: Response) => {
  res.send("sudoku solutions are coming!");
});

module.exports = app;
