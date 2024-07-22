import { Square } from "./Square";

export function WinnerModal({winner, playAgain, resetGame}) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : "Ganó:";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className="win">{winner && <Square>{winner}</Square>}</header>

        <footer>
          <button onClick={playAgain}>Jugar de nuevo</button>
          <button onClick={resetGame}>Reiniciar juego</button>
        </footer>
      </div>
    </section>
  );
}
