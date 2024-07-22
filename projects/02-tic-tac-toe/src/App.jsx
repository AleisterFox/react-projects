import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [points, setPoints] = useState(Array(2).fill(0));

  const [turn, setTurn] = useState(TURNS.X);
  // null es que no hay ganador, false es un empate
  const [winner, setWinner] = useState(null);


  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPoints(Array(2).fill(0));
    setTurn(TURNS.X);
    setWinner(null);
  }

  const playAgain = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }


  const updatePoints = (winner) => {
    const newPoints = [...points];
    const actualWinner = winner === 'x' ? 0 : 1;
    newPoints[actualWinner] += 1;
    setPoints(newPoints)
  }

  const updateBoard = (index) => {
    // const newBoard2 = board[index] === null ? newBoard : board; FORMA 1
    if (board[index] || winner) return; //FORMA 2
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // Revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner ){
      setWinner(newWinner);
      updatePoints(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
    //TODO: Revisar si el juego termino
  }
  return (
    <main className="board">
      <button onClick={playAgain}>Jugar de nuevo</button>
      <button onClick={resetGame}>Reiniciar juego</button>
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square 
            key={index} 
            index={index}
            updateBoard={updateBoard}
            >
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <div>
          <Square isSelected = {turn === TURNS.X}>{TURNS.X}</Square>
          <h2>{points[0]}</h2>
        </div>
        <div>
          <Square isSelected = {turn === TURNS.O}>{TURNS.O}</Square>
          <h2>{points[1]}</h2>
        </div>
      </section>

      <WinnerModal winner={winner} playAgain={playAgain} resetGame={resetGame} />

    </main>
  );
}

export default App;
