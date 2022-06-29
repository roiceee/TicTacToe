// ADD FOR PVP MODE

// player chooses the cell
// register the cell to the array
// check winning conditions.
//      if win, display winner and restore the whole board events
//      RESTORE
// display mark on cell
// disable activity on that cell

//WINNING CONDITION CHECK
//the board is represented implemented using an array with the check method. loop the array and check for winning conditions diagonally, horizontally, and vertically


//______________________________________________________________________________________________________________________________________________

let scoreBoard = new Array(9);

//true - playerX || false - playerY
let turn = true;
let playerOne;
let playerTwo;
const sound = new Audio("sounds/cellSound.mp3");
const winSound = new Audio("sounds/winSound.mp3");

const playerX = () => {
    let score = 0;
    const addScore = () => score+=1;
    const place = () => {return "X"}
    return {
        place,
        addScore,
        score
    }
}

const player0 = () => {
    const {addScore, score} = playerX();
    const place = () => {return "0"};
    return {
        place,
        addScore,
        score
    }
}

function initializePVP() {
    playerOne = playerX();
    playerTwo = player0();
}

 function addCellEvents() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            if (cell.getAttribute("data-marked") === "true") {
                return;
            }
             mainEvents(cell);
        })
    })
}

async function mainEvents(cell) {
    cell.setAttribute('data-marked', "true");
    const cellIndex = cell.getAttribute("data-index");
    const currentPlayer = returnPlayerTurn();
    playSound();
    addToScoreBoard(currentPlayer, cellIndex);
    await addMarktoDom(currentPlayer, cell);
    changeTurn();
    if (checkWinner(currentPlayer)){
        playWinningSound();
        displayWinner(currentPlayer);
        disableCells();
        setTimeout(() => {
            refreshGame();
        }, 5000);
}
}

function disableCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.setAttribute('data-marked', "true");
    })
}

function playSound() {
    sound.play();
}

function playWinningSound() {
    winSound.play();
}

function displayWinner(player) {
    const currentTurnIndicator = document.querySelector(".current-turn");
    currentTurnIndicator.textContent = player.place() + " WINS!";

}

function refreshGame() {
    scoreBoard = new Array(9);
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.setAttribute('data-marked', "false");
        cell.textContent = "";
    })
    const currentTurnIndicator = document.querySelector(".current-turn");
    currentTurnIndicator.textContent = "X's turn!";
}


function changeTurn() {
    const player = returnNextTurn();
    const currentTurnIndicator = document.querySelector(".current-turn");
    currentTurnIndicator.textContent = player.place() + "'s turn!";
    
    if (turn) {
        turn = false;
    } else {
        turn = true;
    }
}

function returnPlayerTurn() {
    if (turn) {
        return playerOne;
    }
    return playerTwo;
}

function returnNextTurn() {
    if (!turn) {
        return playerOne;
    }
    return playerTwo;
}

function addToScoreBoard(player, index) {
    scoreBoard[index] = player.place();
}

async function addMarktoDom(player, cell) { 
    return new Promise((resolve, reject) => {
        cell.textContent = player.place();
        cell.style.fontSize = "48px";
        if (turn) {
            cell.style.color = "var(--clr-red)";
            resolve();
            return;
        }
        cell.style.color = "var(--clr-blue)";
        resolve();
    })
   
}

function checkWinner(player) {
    const move = player.place();
    return checkHorizontal(move) || checkVertical(move) || checkDiagonal(move);
}

function checkHorizontal(move) {
    return (scoreBoard[0] === move && scoreBoard[1] === move && scoreBoard[2] === move) ||
    (scoreBoard[3] === move && scoreBoard[4] === move && scoreBoard[5] === move) ||
    (scoreBoard[6] === move && scoreBoard[7] === move && scoreBoard[8] === move);
}

function checkVertical(move) {
    return (scoreBoard[0] === move && scoreBoard[3] === move && scoreBoard[6] === move) ||
    (scoreBoard[1] === move && scoreBoard[4] === move && scoreBoard[7] === move) ||
    (scoreBoard[2] === move && scoreBoard[5] === move && scoreBoard[8] === move);
}

function checkDiagonal(move) {
    return (scoreBoard[0] === move && scoreBoard[4] === move && scoreBoard[8] === move) ||
    (scoreBoard[2] === move && scoreBoard[4] === move && scoreBoard[6] === move);
}

initializePVP();
addCellEvents();


//implement AI