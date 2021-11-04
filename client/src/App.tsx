import React from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <h1>Classic Sudoku</h1>
      <Game />
      <Footer />
    </div>
  );
}

export default App;
