"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.use(express.json());
// test route
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.get("/solutions", function (req, res) {
    res.send("sudoku solutions are coming!");
});
module.exports = app;
