const app = require('./app')

// connect("mongodb://localhost:27017/sudoku");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
