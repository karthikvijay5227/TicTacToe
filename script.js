let player1 = 'X';
let player2 = 'O';
let currentPlayer = player1;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const restartBtn = document.getElementById('restartBtn');
const gameboard = document.getElementById('gameboard');
gameboard.addEventListener('click', markBox);

function markBox(e) {
    if (gameOver) {
        return;
    }
    const boxId = e.target.id;
    if (gameBoard[boxId] !== '') {
        return;
    }
    gameBoard[boxId] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinningConditions();
    switchPlayer();
    updatePlayerText();
}

restartBtn.addEventListener('click', restartGame);

function restartGame() {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = 'Restarting game...';
    document.body.appendChild(toast);
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = player1;
    gameOver = false;
    const boxes = document.getElementsByClassName('box');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = '';
    }
    updatePlayerText();
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 2000);
}

function checkWinningConditions() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            return;
        }
    }
    if (!gameBoard.includes('')) {
        gameOver = true;
    }

}

function switchPlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
}

function updatePlayerText() {
    const playerText = document.getElementById('playerText');
    if (gameOver) {
        if (currentPlayer === player1) {
            playerText.textContent = 'Player 2 Wins!';
        } else {
            playerText.textContent = 'Player 1 Wins!';
        }
    } else {
        playerText.textContent = `Player ${currentPlayer}'s turn`;
    }
}
