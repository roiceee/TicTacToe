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

let scoreBoard = ['','','','','','','','',''];

//true - playerX || false - playerY
let turn = true;
let playerOne;
let playerTwo;

const playerX = () => {
    let score = 0;
    const addScore = () => score+=1;
    const place = () =>{return "X"}
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
            cell.setAttribute('data-marked', "true");
            const cellIndex = cell.getAttribute("data-index");
            const currentPlayer = returnPlayerTurn();
            addToScoreBoard(currentPlayer, cellIndex);
            addMarktoDom(currentPlayer, cell);
            changeTurn();
        })
    })
}

function changeTurn() {
    const player = returnNextTurn();
    const currentTurnIndicator = document.querySelector(".current-turn");
    currentTurnIndicator.textContent = player.place();
    
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

function addMarktoDom(player, cell) { 
    cell.textContent = player.place();
    cell.style.fontSize = "48px";
    if (turn) {
        cell.style.color = "var(--clr-red)";
        return;
    }
    cell.style.color = "var(--clr-blue)";
}

initializePVP();
addCellEvents();