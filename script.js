const BOARD_SIZE = 9;

let board = [];

function createBoard() {
  for (let i = 0; i < BOARD_SIZE; i++) {
    board.push([]);
    for (let j = 0; j < BOARD_SIZE; j++) {
      board[i].push({
        x: i,
        y: j,
        mine: false,
        revealed: false,
        flagged: false,
        neighborMines: 0,
      });
    }
  }
}


