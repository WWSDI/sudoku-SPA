"use strict";
var app = require('./app');
// connect("mongodb://localhost:27017/sudoku");
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
