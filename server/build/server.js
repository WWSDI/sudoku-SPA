"use strict";
var app = require('./app');
var connect = require('mongoose').connect;
var mongoDbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/sudoku';
console.log(mongoDbUrl);
connect(mongoDbUrl);
var port = process.env.PORT || 5005;
app.listen(port, function () {
    console.log("Server is running on port " + port);
});
