let boardArr = [];
let playerTurn = 1;
const color1 = 'blue';
const color2 = 'red';
const width = 7;
const height = 6;
const turn = document.createElement('span');
const HUD = document.createElement('div');

function makeJsBoard() {
	for (let i = 0; i < height; i++) {
		let row = [ 0, 0, 0, 0, 0, 0, 0 ];
		boardArr.push(row);
	}
}

function disableMoves() {
	let drop = document.getElementById('dropSelector');
	drop.remove();
}

function clearBoard() {
	boardArr = [];
	playerTurn = 1;

	const gameBoard2 = document.getElementById('board');
	gameBoard2.remove();

	let newBoard = document.createElement('table');
	newBoard.setAttribute('id', 'board');
	let game = document.getElementById('game');
	game.appendChild(newBoard);
}

function switchPlayer() {
	if (playerTurn === 1) {
		playerTurn++;
	} else {
		playerTurn--;
	}
}

function makeHUD() {
	turn.setAttribute('id', 'turn');
	turn.classList.add('player1');
	turn.innerText = `Player ${playerTurn}`;
	document.body.prepend(HUD);
	HUD.append(turn);
}

function updateHUD() {
	let HUDClass = turn.classList;
	// add "if" here to prevent this from switching on full
	HUDClass.toggle('player1');

	turn.innerText = `Player ${playerTurn}`;
}

function makeHTMLBoard() {
	const gameBoard = document.getElementById('board');
	const dropSelector = document.createElement('tr');

	dropSelector.setAttribute('id', 'dropSelector');
	dropSelector.classList.add('player1');
	dropSelector.addEventListener('click', handleClick);

	for (let i = 0; i < width; i++) {
		let topCell = document.createElement('td');
		topCell.setAttribute('id', i);
		dropSelector.append(topCell);
	}

	gameBoard.append(dropSelector);

	for (let y = 0; y < height; y++) {
		const row = document.createElement('tr');

		if (y != 5) {
			for (let x = 0; x < width; x++) {
				const cell = document.createElement('td');
				cell.setAttribute('id', `${y}-${x}`);
				cell.classList.add(`row${y}`);
				cell.classList.add(`col${x}`);
				row.append(cell);
			}
		} else {
			// bottom row (y=5) is classed 'drop-point', meaning it is where the circle will fall to
			for (let x = 0; x < width; x++) {
				const cell = document.createElement('td');
				cell.setAttribute('id', `${y}-${x}`);
				cell.classList.add(`row${y}`);
				cell.classList.add(`col${x}`);
				cell.classList.add('drop-point');
				row.append(cell);
			}
		}
		gameBoard.append(row);
	}
}
function makeResetBtn() {
	const resetBtn = document.createElement('button');
	resetBtn.setAttribute('id', 'reset');
	resetBtn.innerText = 'PLAY AGAIN?';

	resetBtn.addEventListener('click', function() {
		clearBoard();
		makeJsBoard();
		makeHTMLBoard();
		updateHUD();

		let win = document.getElementById('win-sign');

		win.remove();

		resetBtn.remove();
	});
	document.body.append(resetBtn);
}
function makeWinNotification(num) {
	let playerVictory = document.createElement('p');
	playerVictory.classList.add('hidden');
	playerVictory.setAttribute('id', 'win-sign');
	playerVictory.innerText = `PLAYER ${playerTurn} WINS`;
	document.body.append(playerVictory);
	makeResetBtn();
}

makeJsBoard();
makeHUD();
makeHTMLBoard();

function endGame(str) {
	alert(str);
}

function checkWinArr(arr) {
	// scans all arrays of 4, then returns true if that array of 4 contains all playerTurn
	if (arr.length === 4) return arr.every((e) => e === playerTurn);
}

// make Object to store and organize all win direction functions

function winVert(x) {
	let vert = [];
	for (let i = 0; i < height; i++) {
		vert.push(boardArr[i][x]);
	}
	for (let j = 0; j < height; j++) {
		let vertWinArr = vert.slice(j, j + 4);
		if (checkWinArr(vertWinArr)) {
			makeWinNotification(playerTurn);
			disableMoves();
		}
	}
}

function winDiagUpRight(x, y) {
	let diag = [];
	for (let i = 0; i < width; i++) {
		if (y - i <= 5 && y - i >= 0 && x + i <= 6 && x + i >= 0) {
			diag.push(boardArr[y - i][x + i]);
		}
	}
	console.log(diag);
	for (let j = 0; j < 6; j++) {
		let winDiagArrUpRight = diag.slice(j, j + 4);
		if (checkWinArr(winDiagArrUpRight)) {
			makeWinNotification(playerTurn);
			disableMoves();
			alert(`Player ${playerTurn} wins!`);
		}
	}
}

function winDiagDownLeft(x, y) {
	let diagDownLeft = [];
	for (let i = 0; i < width; i++) {
		if (y + i <= 5 && y + i >= 0 && x - i <= 6 && x - i >= 0) {
			diagDownLeft.push(boardArr[y + i][x - i]);
		}
	}

	for (let j = 0; j < height; j++) {
		let diagWinArrUL = diagDownLeft.slice(j, j + 4);
		if (checkWinArr(diagWinArrUL)) {
			makeWinNotification(playerTurn);
			disableMoves();

			alert(`Player ${playerTurn} wins!`);
		}
	}
}

function winDiagUpLeft(x, y) {
	let diagUpLeft = [];
	for (let i = 0; i < width; i++) {
		if (y - i <= 5 && y - i >= 0 && x - i <= 6 && x - i >= 0) {
			diagUpLeft.push(boardArr[y - i][x - i]);
		}
	}
	console.log(diagUpLeft);

	for (let j = 0; j < height; j++) {
		let diagWinArrUpLeft = diagUpLeft.slice(j, j + 4);
		if (checkWinArr(diagWinArrUpLeft)) {
			makeWinNotification(playerTurn);
			disableMoves();
			alert(`Player ${playerTurn} wins!`);
		}
	}
}

function winHor(y) {
	for (let i = 0; i < width; i++) {
		let horWinArr = boardArr[y].slice(i, i + 4);
		if (checkWinArr(horWinArr)) {
			console.log(checkWinArr(horWinArr));
			makeWinNotification(playerTurn);
			disableMoves();
			alert(`Player ${playerTurn} wins!`);
		}
	}
}

function winDiagDownRight(x, y) {
	let diagDownRight = [];
	for (let i = 0; i < width; i++) {
		if (y + i <= 5 && y + i >= 0 && x + i <= 6 && x + i >= 0) {
			diagDownRight.push(boardArr[y + i][x + i]);
		}
	}
	for (let j = 0; j < height; j++) {
		let diagWinArrDownRight = diagDownRight.slice(j, j + 4);
		if (checkWinArr(diagWinArrDownRight)) {
			makeWinNotification(playerTurn);
			disableMoves();
			alert(`Player ${playerTurn} wins!`);
		}
	}
}

function checkForWin(x, y) {
	if (boardArr.every((row) => row.every((val) => val != 0))) {
		return endGame('Tie!');
	}

	winHor(y);
	winVert(x);
	winDiagUpRight(x, y);
	winDiagUpLeft(x, y);
	winDiagDownLeft(x, y);
	winDiagDownRight(x, y);
}

function placeInTable(x, y) {
	const piece = document.createElement('div');
	piece.classList.add('piece');
	piece.classList.add(`player${playerTurn}`);
	piece.style.top = -50 * (y + 2);

	const spot = document.getElementById(`${y}-${x}`);
	spot.append(piece);
}

function updateBoardArr(x, y) {
	if (playerTurn === 1) {
		boardArr[y][x] = 1;
	} else {
		boardArr[y][x] = 2;
	}
}

function handleClick(e) {
	let collumnList = Array.from(document.getElementById('dropSelector').children);
	let xPos = collumnList.indexOf(e.target);
	let rowList = Array.from(document.getElementsByClassName(`col${xPos}`));
	let yourMove = document.querySelector(`.col${xPos}.drop-point`);
	let yPos = rowList.indexOf(yourMove);

	placeInTable(xPos, yPos);

	if (yPos !== -1) {
		let dropClasses = dropSelector.classList;
		dropClasses.toggle('player1');
	} else {
		console.log('nope');
		return;
	}

	if (boardArr[0][xPos] === 0) {
		//    select the next verticle position and assign "drop-point" class to it
		let nextDropPoint = document.querySelector(`.col${xPos}.row${yPos - 1}`);
		if (nextDropPoint) {
			nextDropPoint.classList.add('drop-point');
		}
		yourMove.classList.add(`player${playerTurn}`);
		yourMove.classList.remove('drop-point');
	}

	updateBoardArr(xPos, yPos);
	checkForWin(xPos, yPos);
	setTimeout(switchPlayer(), 100);
	updateHUD();
}
