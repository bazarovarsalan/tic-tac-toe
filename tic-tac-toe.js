let cell = document.querySelectorAll(".cell");
cell = Array.from(cell);

const restartButton = document.querySelector("#restartButton");
const winningMessage = document.querySelector(".winningMessage");
const winningTextMessage = document.querySelector("#winningTextMessage");
const quountityOfPlayers =
  document.getElementsByClassName("quountityOfPlayers");
const quontityOfPlayers = document.querySelector(".quontityOfPlayers");
const buttonPlayWithComputer = document.querySelector("#playWithComputer");
const buttonPlayWithFriend = document.querySelector("#playWithFriend");

const playerX = "X";
const playerCircle = "O";
let player = playerX;
const winLine = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
let winningArray = [];
let computerIsPlaying = false;

startGame();

restartButton.addEventListener("click", restartGame);
buttonPlayWithFriend.addEventListener("click", startGameWithFriend);
buttonPlayWithComputer.addEventListener("click", startGameWithComputer);

quontityOfPlayers.classList.toggle("show");

function startGame() {
  for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener("click", cellClick);
  }
}

function cellClick() {
  if (this.innerHTML === "") {
    this.innerHTML = player;
  } else {
    return;
  }
  if (!checkGameOver()) {
    player = player === playerX ? playerCircle : playerX;
    if (computerIsPlaying) {
      computerTurn();
    }
  }
}

function checkGameOver() {
  let arrayOfFilledCells = [];
  for (let i in cell) {
    if (cell[i].innerHTML === player) {
      arrayOfFilledCells.push(parseInt(cell[i].getAttribute("data-pos")));
    }
  }
  console.log(arrayOfFilledCells);
  if (checkWin(arrayOfFilledCells)) {
    let winningPlayer = player;
    window.setTimeout(() => {
      winningMessage.classList.toggle("show");
      winningTextMessage.innerText = `${winningPlayer} Wins!`;
      highlight(winningArray);
    }, 100);
    return true;
  } else if (checkDraw()) {
    window.setTimeout((x) => {
      showDraw();
    }, 100);
    return true;
  } else {
    return false;
  }
}

function checkWin(arr) {
  for (let i = 0; i < winLine.length; i++) {
    let current = winLine[i];
    let check = true;

    for (let j in current) {
      if (arr.indexOf(current[j]) === -1) {
        check = false;
      }
    }
    if (check) {
      winningArray = [...current];
      return true;
    }
  }
  return false;
}

function restartGame() {
  for (let i = 0; i < cell.length; i++) {
    cell[i].innerHTML = "";
    cell[i].classList.remove("highlight");
  }
  winningMessage.classList.remove("show");

  arrayOfFilledCells = [];
  winningArray = [];
  quontityOfPlayers.classList.add("show");
  player = playerX;
}

function checkDraw() {
  for (let i = 0; i < cell.length; i++) {
    if (cell[i].innerHTML === "") {
      return false;
    }
  }
  return true;
}

function showDraw() {
  winningTextMessage.innerText = `Draw!`;
  winningMessage.classList.add("show");
  restartButton.classList.remove("show");
}

let highlight = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    let el = document.querySelector(`.cell[data-pos="${arr[i]}"]`);
    console.log(arr, el);
    el.classList.add("highlight");

    //if (arr.indexOf(parseInt(cell[i].getAttribute("pos"))) !== -1) {
    // cell[i].classList.toggle("highlight");
  }
};

function startGameWithFriend() {
  startGame();
  quontityOfPlayers.classList.remove("show");
  computerIsPlaying = false;
}

function startGameWithComputer() {
  startGame();
  quontityOfPlayers.classList.toggle("show");
  computerIsPlaying = true;
}

function computerTurn() {
  let emptyCells = [];
  for (let i = 0; i < cell.length; i++) {
    if (cell[i].innerHTML === "") {
      emptyCells.push(cell[i]);
    }
  }
  let randomCell = Math.floor(Math.random() * emptyCells.length);
  let computerPlayer = player;

  emptyCells[randomCell].innerHTML = computerPlayer;
  checkGameOver();
  player = player === playerX ? playerCircle : playerX;
}
/*






-make a smart logic of play Computer;




*/
