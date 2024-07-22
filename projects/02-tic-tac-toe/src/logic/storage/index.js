export const saveGameToStorage = ({board, turn, points}) => {
    window.localStorage.setItem('board', JSON.stringify(board));
    window.localStorage.setItem('turn', turn);
    window.localStorage.setItem('points', JSON.stringify(points));
}

export const resetGameStorage = () => {
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
    window.localStorage.removeItem('points');
}

export const restartGame = () => {
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
}
