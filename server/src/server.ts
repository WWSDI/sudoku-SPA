const app = require('./app')
const {connect} = require('mongoose')

connect("mongodb://localhost:27017/sudoku");

const port = process.env.PORT || 5005

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
 