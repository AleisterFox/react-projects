import { WINNER_COMBOS } from "../constants";

// VERIFICAR GANADOR
export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // Si no hay ganador
  return null;
};

// VERIFICAR SI EL JUEGO TERMINO
export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
