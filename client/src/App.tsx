import React from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import Game from "./components/Game";
import Tips from "./components/Tips";
// import dotenv from "dotenv";

// dotenv.config();

function App() {
  return (
    <div className="App">
      <h1>Classic Sudoku</h1>
      <Game />
      {/* <Tips /> */}
      <Footer />
    </div>
  );
}

export default App;
