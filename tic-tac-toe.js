let cell = document.querySelectorAll(".cell");
cell = Array.from(cell);

const restartButton = document.querySelector("#restartButton");
const winningMessage = document.querySelector(".winningMessage");
const winningTextMessage = document.querySelector("#winningTextMessage");
const quauntityOfPlayers =
  document.getElementsByClassName("quauntityOfPlayers");
const quantityOfPlayers = document.querySelector(".quantityOfPlayers");
const buttonPlayWithComputer = document.querySelector("#playWithComputer");
const buttonPlayWithFriend = document.querySelector("#playWithFriend");
const playerX = "X";
const playerCircle = "O";
let player = playerX;
let circleTurn = false;
let statusOfTurn = document.querySelector("#statusOfTurn");
const allWinningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
let winnigCells = [];
let filledCellsOfX = [];
let filledCellsOfCircle = [];
let xArrayForNextTurnOfComp = [];
let circeArrayForNextTurnOfComp = [];
let computerIsPlayingCheck = false;
let computerNextTurn = false;

startGame();
quantityOfPlayers.classList.add("show");

buttonPlayWithFriend.addEventListener("click", startGameWithFriend);
buttonPlayWithComputer.addEventListener("click", startGameWithComputer);

restartButton.addEventListener("click", restartGame);

function startGame() {
  for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener("click", cellClick);
  }
}

function cellClick() {
  if (this.innerHTML === "") {
    turnOfPlayer(this);
  } else {
    return;
  }
  checkResult();
}

function turnOfPlayer(elem) {
  if (!circleTurn) {
    elem.innerHTML = playerX;
    filledCellsOfX.push(parseInt(elem.getAttribute("data-pos")));
  } else {
    elem.innerHTML = playerCircle;
    filledCellsOfCircle.push(parseInt(elem.getAttribute("data-pos")));
  }
  circleTurn = !circleTurn;
  if (computerIsPlayingCheck) {
    computerNextTurn = !computerNextTurn;
    computerTurn();
    checkResult();
  }
  statusOfTurn.textContent = !circleTurn ? "X's turn" : "O's turn";
}

function checkResult() {
  console.log("asd");
  if (checkWin(filledCellsOfX)) {
    printFinalResult(false, "X");
  } else if (checkWin(filledCellsOfCircle)) {
    printFinalResult(false, "O");
  } else if (checkDraw()) {
    printFinalResult(checkDraw(), undefined);
  }
}

function checkWin(array) {
  for (let i = 0; i < allWinningCombinations.length; i++) {
    let winCombination = allWinningCombinations[i];
    let check = true;
    let count = 0;
    for (let j = 0; j < winCombination.length; j++) {
      if (array.indexOf(winCombination[j]) === -1) {
        check = false;
      } else {
        count += 1;
      }
    }
    if (check) {
      winnigCells = [...winCombination];
      return true;
    }
  }
  return false;
}

function checkDraw() {
  for (let i = 0; i < cell.length; i++) {
    if (cell[i].innerHTML === "") {
      return false;
    }
  }
  return true;
}

function printFinalResult(isDraw, string) {
  if (isDraw) {
    winningMessage.classList.add("show");
    winningTextMessage.innerText = `Draw!`;
  } else if (!isDraw) {
    winningMessage.classList.add("show");
    winningTextMessage.innerText = `${string}'s win!`;
    highlight(winnigCells);
  }
  statusOfTurn.innerHTML = "";
}

let highlight = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    let el = document.querySelector(`.cell[data-pos="${arr[i]}"]`);
    el.classList.add("highlight");
  }
};

function startGameWithFriend() {
  quantityOfPlayers.classList.remove("show");
  statusOfTurn.textContent = !circleTurn ? "X's turn" : "O's turn";
}

function startGameWithComputer() {
  quantityOfPlayers.classList.remove("show");
  statusOfTurn.textContent = !circleTurn ? "X's turn" : "O's turn";
  computerIsPlayingCheck = true;
  computerTurn();
}

function computerTurn() {
  if (!computerNextTurn) {
    return;
  } else {
    let emptyCells = [];
    for (let i = 0; i < cell.length; i++) {
      if (cell[i].innerHTML === "") {
        emptyCells.push(cell[i]);
      }
    }
    if (emptyCells.length === 0) {
      return;
    }
    let randomCell = Math.floor(Math.random() * emptyCells.length);
    let cellCenter = document.querySelector(`.cell[data-pos="5"]`);

    if (cellCenter && cellCenter.innerHTML === "") {
      turnOfPlayer(cellCenter); // first turn of computer always to set center cell
      return;
    } else {
      turnOfPlayer(emptyCells[randomCell]);
      return;
    }
  }
}

function restartGame() {
  for (let i = 0; i < cell.length; i++) {
    if (cell[i].innerHTML !== "") {
      cell[i].innerHTML = "";
      cell[i].classList.remove("highlight");
      winnigCells = [];
      filledCellsOfX = [];
      filledCellsOfCircle = [];
    }
  }
  quantityOfPlayers.classList.add("show");
  winningMessage.classList.remove("show");
  computerIsPlayingCheck = false;
}
