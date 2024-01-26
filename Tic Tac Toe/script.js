function comp() {
    document.getElementById("main").style.display = "none";
    document.getElementById("board2").style.display = "grid";
}

function friend() {
  document.getElementById("main").style.display = "none";
  document.getElementById("board1").style.display = "grid";
}


const board = document.getElementById("board1");
const result = document.getElementById("result");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");
    
    if (gameBoard[index] === "" && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        
        if (checkWinner()) {
            result.textContent = `The Player ${currentPlayer} wins!`;
        } else if (isBoardFull()) {
            result.textContent = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            result.textContent = `Current Player: ${currentPlayer}`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== "");
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    result.textContent = "Current Player: X";
    currentPlayer = "X";

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = "";
    });
}

createBoard();


document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board2");
    const message = document.querySelector("#result");

    let cells = Array.from({ length: 9 }, (_, index) => createCell(index));
    let currentPlayer = "X";

    function createCell(index) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => cellClick(index));
      board.appendChild(cell);
      return cell;
    }

    function cellClick(index) {
      if (!cells[index].textContent) {
        cells[index].textContent = currentPlayer;
        if (checkWinner()) {
          message.textContent = `${currentPlayer} wins!`;
          disableClicks();
        } else if (cells.every(cell => cell.textContent)) {
          message.textContent = "It's a tie!";
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          computerMove();
        }
      }
    }

    function computerMove() {
      const availableCells = cells.filter(cell => !cell.textContent);
      if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const computerCell = availableCells[randomIndex];
        computerCell.textContent = currentPlayer;
        if (checkWinner()) {
          message.textContent = `${currentPlayer} wins!`;
          disableClicks();
        } else if (cells.every(cell => cell.textContent)) {
          message.textContent = "It's a tie!";
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    }

    function checkWinner() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
      ];

      return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
      });
    }

    function disableClicks() {
      cells.forEach(cell => cell.removeEventListener("click", cellClick));
    }
  });