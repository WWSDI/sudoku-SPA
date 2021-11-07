const app = require('./app')
const {connect} = require('mongoose')

const mongoDbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/sudoku'

console.log(mongoDbUrl)

connect(mongoDbUrl);

const port = process.env.PORT || 5005

app.listen(port, () => {
  console.log("Server is running on port " + port);
});