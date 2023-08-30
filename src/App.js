import React, { useState } from "react";

import "./App.css";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import ResetButton from "./components/ResetButton";
import banner from "./components/banner.jpg";

function App() {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const boxClickHandler = (boxIndex) => {
    const updatedBoard = board.map((value, index) => {
      if (index == boxIndex) {
        return xPlaying === true ? "X" : "O";
      } else {
        return value;
      }
    });

    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "X") {
        let { xScore } = scores;
        xScore += 1;
        let { oScore } = scores;
        setScores({ xScore, oScore });
      } else {
        let { oScore } = scores;
        oScore += 1;
        let { xScore } = scores;
        setScores({ xScore, oScore });
      }
      console.log(scores);
    }

    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App">
      <img src={banner} className="image" />
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : boxClickHandler} />
      <ResetButton reset={resetBoard} />
    </div>
  );
}

export default App;
