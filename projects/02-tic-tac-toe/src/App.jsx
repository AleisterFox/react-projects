import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import {
  saveGameToStorage,
  resetGameStorage,
  restartGame,
} from "./logic/storage/index.js";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [points, setPoints] = useState(() => {
    const pointsFromStorage = window.localStorage.getItem("points");
    return pointsFromStorage ? JSON.parse(pointsFromStorage) : Array(2).fill(0);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  // null es que no hay ganador, false es un empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPoints(Array(2).fill(0));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  };

  const playAgain = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    restartGame();
  };

  const updatePoints = (winner) => {
    const newPoints = [...points];
    const actualWinner = winner === "x" ? 0 : 1;
    newPoints[actualWinner] += 1;
    setPoints(newPoints);
  };

  const updateBoard = (index) => {
    // const newBoard2 = board[index] === null ? newBoard : board; FORMA 1
    if (board[index] || winner) return; //FORMA 2
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Guardar partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
      points: points,
    });

    // Revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      updatePoints(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <button onClick={playAgain}>Jugar de nuevo</button>
      <button onClick={resetGame}>Reiniciar juego</button>
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <div>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <h2>{points[0]}</h2>
        </div>
        <div>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
          <h2>{points[1]}</h2>
        </div>
      </section>

      <WinnerModal
        winner={winner}
        playAgain={playAgain}
        resetGame={resetGame}
      />
    </main>
  );
}

export default App;
