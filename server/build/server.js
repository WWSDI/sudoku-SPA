"use strict";
var app = require('./app');
var connect = require('mongoose').connect;
connect("mongodb://localhost:27017/sudoku");
var port = process.env.PORT || 5005;
app.listen(port, function () {
    console.log("Server is running on port " + port);
});
