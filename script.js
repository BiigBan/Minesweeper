const BOARD_SIZE = 9;
const NUMBER_OF_MINES = 15;

let board = [];
let revealedCells = 0;

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

function revealCell(cell) {
  if (cell.revealed || cell.flagged) {
    return;
  }
  cell.revealed = true;
  revealedCells++;
  const cellElement = document.getElementById(`cell-${cell.x}-${cell.y}`);
  cellElement.classList.add("revealed");
  if (cell.mine) {
    cellElement.classList.add("mine");
    alert("Game Over");
    restartGame();
    return;
  }

  if (cell.neighborMines === 0) {
    revealNeighbors(cell.x, cell.y);
  } else {
    cellElement.innerHTML = cell.neighborMines; // display the number of neighboring mines
  }

  if (revealedCells === BOARD_SIZE * BOARD_SIZE - NUMBER_OF_MINES) {
    alert("You Won!");
    return;
  }
}

function revealNeighbors(x, y) {
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && i < BOARD_SIZE && j >= 0 && j < BOARD_SIZE && !board[i][j].mine && !board[i][j].revealed) {
        revealCell(board[i][j]);
      }
    }
  }
}

function flagCell(cell) {
  if (cell.revealed) {
    return;
  }
  cell.flagged = !cell.flagged;
  const cellElement = document.getElementById(`cell-${cell.x}-${cell.y}`);
  cellElement.innerHTML = cell.flagged ? "M" : "";
}

function initializeGame() {
  createBoard();
  plantMines();
  calculateNeighborMines();

  const boardElement = document.querySelector(".board");
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cellElement = document.createElement("div");
      cellElement.id = `cell-${i}-${j}`;
      cellElement.classList.add("cell");
      cellElement.addEventListener("click", () => revealCell(board[i][j]));
      cellElement.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        flagCell(board[i][j]);
      });
      boardElement.appendChild(cellElement);
    }
  }
}
function restartGame() {
  // Reset board, revealedCells, and any other relevant variables
  board = [];
  revealedCells = 0;
  createBoard();
  plantMines();
  calculateNeighborMines();

  // Reset cell elements
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("revealed", "mine");
    cell.innerHTML = "";
  });
}

document.getElementById("restart-button").addEventListener("click", restartGame);

initializeGame();
