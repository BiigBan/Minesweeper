const BOARD_SIZE = 9;
const NUMBER_OF_MINES = 15;

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

function plantMines() {
  let plantedMines = 0;
  while (plantedMines < NUMBER_OF_MINES) {
    const x = Math.floor(Math.random() * BOARD_SIZE);
    const y = Math.floor(Math.random() * BOARD_SIZE);
    if (!board[x][y].mine) {
      board[x][y].mine = true;
      plantedMines++;
    }
  }
}

function calculateNeighborMines() {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (!board[i][j].mine) {
        let count = 0;
        for (let x = i - 1; x <= i + 1; x++) {
          for (let y = j - 1; y <= j + 1; y++) {
            if (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE && board[x][y].mine) {
              count++;
            }
          }
        }
        board[i][j].neighborMines = count;
      }
    }
  }
}