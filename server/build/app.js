"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var getSolutions = require("./lib/getSolutions");
app.use(express.json());
// test route
app.get("/", function (req, res) {
    res.send("Hello World!");
});
// GET 10 puzzles for each difficulty, send to the client and to be saved in local storage
app.get("/puzzles", function (req, res) {
    // 1. get 10 solutions from the data folder
    var solutions = getSolutions(10);
    // 2. create puzzles based on the solutions
    // 3. send the puzzles & solutions to the client
    res.send("sudoku solutions are coming!");
});
module.exports = app;
