let boardArr = []
let playerTurn = 1
const color1 = 'blue'
const color2 = 'red'
const width = 7
const height = 6
const turn = document.createElement('span')
const HUD = document.createElement('div')

function makeJsBoard() {
    for (let i = 0; i < height; i++) {
        let row = [0,0,0,0,0,0,0]
        boardArr.push(row)
    }
}

function switchPlayer() {
    if (playerTurn === 1) {
        playerTurn++
            } else {
            playerTurn--
            }
}

function makeHUD() {
    
    
    turn.setAttribute('id', 'turn')
    turn.classList.add('player1')
    turn.innerText = `Player ${playerTurn}`
    document.body.prepend(HUD)
    HUD.append(turn)
}

function updateHUD() {
    
    let HUDClass = turn.classList
    HUDClass.toggle('player1')
    
    turn.innerText = `Player ${playerTurn}`
    
}

function makeHTMLBoard() {
    
    const gameBoard = document.getElementById('board')
    const dropSelector = document.createElement('tr')
    dropSelector.setAttribute('id', 'dropSelector')
    dropSelector.classList.add('player1')
    dropSelector.addEventListener('click', handleClick)

    for (let i = 0; i < width; i++) {
        let topCell = document.createElement('td');
        topCell.setAttribute('id', i);
        dropSelector.append(topCell)
    }

    gameBoard.append(dropSelector)

    for (let y = 0; y < height; y++) {
        const row = document.createElement('tr');

        if (y != 5) {
            
            for (let x = 0; x < width; x++){
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                cell.classList.add(`row${y}`)
                cell.classList.add(`col${x}`)
                row.append(cell)
            }
        } else {
            // bottom row (y=5) is classed 'drop-point', meaning it is where the circle will fall to
            for (let x = 0; x < width; x++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            cell.classList.add(`row${y}`)
            cell.classList.add(`col${x}`)
            cell.classList.add('drop-point')
            row.append(cell)
            }
        }
        gameBoard.append(row);
    }
}

makeJsBoard();
makeHUD();
makeHTMLBoard();

function endGame(str) {
    alert(str);
}

function placeInTable(yPos, xPos) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`player${playerTurn}`);
    piece.style.top = -50 * (yPos + 2);
  
    const spot = document.getElementById(`${yPos}-${xPos}`);
    spot.append(piece);
  }

function handleClick(e) {

    
    
    let dropRowArr = Array.from(document.getElementById('dropSelector').children)
    let xPos = dropRowArr.indexOf(e.target)
    let rowList = Array.from(document.getElementsByClassName(`col${xPos}`))
    let yourMove = document.querySelector(`.col${xPos}.drop-point`)
    
    let yPos = rowList.indexOf(yourMove)

    let classes = dropSelector.classList;
    classes.toggle("player1")

    

   if (boardArr[0][xPos] === 0) {
    //    select the next verticle position and assign "drop-point" class to it
        let nextDropPoint = document.querySelector(`.col${xPos}.row${yPos -1}`)

        if (nextDropPoint) {nextDropPoint.classList.add('drop-point')}

        yourMove.classList.add(`player${playerTurn}`)
        yourMove.classList.remove('drop-point')

        function updateBoardArr() {
            if (playerTurn === 1) {
               boardArr[yPos][xPos] = 1
           } else {
               boardArr[yPos][xPos] = 2
               }
           }
        updateBoardArr();

        placeInTable(yPos, xPos);
   }

        

    function checkForWin() {

        if (boardArr.every(row => row.every(val => val != 0))) {
            return endGame('Tie!');
          }

        function checkWinArr(arr){
            if (arr.length === 4)
            return arr.every(e =>e === playerTurn)
        }

        function winHor() {for (let i = 0; i < width; i++) {
            let horWinArr = boardArr[yPos].slice(i, i + 4) 
            if (checkWinArr(horWinArr)){
                alert(`Player ${playerTurn} wins!`)
                    }
                }
            }   
        function winVert() {
            let vert = []
            for (let i = 0; i < height; i++) {
                vert.push(boardArr[i][xPos])
            }
            for (let j = 0; j < height; j++){
            let vertWinArr = vert.slice(j, j + 4)
            if (checkWinArr(vertWinArr)){
                setTimeout(alert(`Player ${playerTurn} wins!`), 100)
                    }
                }
            }

        function winDiagR() {
            let diag = []
            for (let i = 0; i < width; i++) {
            if ((yPos - i) <= 5 && (yPos - i) >= 0 && (xPos + i) <= 6 && (xPos + i) >= 0) {
            diag.push(boardArr[yPos - i][xPos + i])
                }
            }
            for (let j = 0; j < 6; j++) {
            let diagWinArr = diag.slice(j, j + 4)
            if (checkWinArr(diagWinArr))  {
                alert(`Player ${playerTurn} wins!`)
                }
            }
        }

        function winDiagL() {
            let diagL = []
            for (let i = 0; i < width; i++) {
                if ((yPos - i) <= 5 && (yPos - i) >= 0 && (xPos - i) <= 6 && (xPos - i) >= 0) {
                diagL.push(boardArr[yPos - i][xPos - i])
                }
            }

            for (let j = 0; j < height; j++) {
                let diagWinArrL = diagL.slice(j, j + 4)
                if (checkWinArr(diagWinArrL))  {
                alert(`Player ${playerTurn} wins!`)
                    }
                }
            }

        function winDiagUL() {
            let diagUL = []
            for (let i = 0; i < width; i++) {

                if ((yPos + i) <= 5 && (yPos + i) >= 0 && (xPos - i) <= 6 && (xPos - i) >= 0) {
            
                diagUL.push(boardArr[yPos + i][xPos - i])
                 }
            }

            for (let j = 0; j < height; j++) {
            let diagWinArrUL = diagUL.slice(j, j + 4)
            if (checkWinArr(diagWinArrUL))  {
                alert(`Player ${playerTurn} wins!`)
                    }
            }
        }

        function winDiagDL() {
            let diagDL = []
            for (let i = 0; i < width; i++) {
            if ((yPos + i) <= 5 && (yPos + i) >= 0 && (xPos + i) <= 6 && (xPos + i) >= 0) {
            diagDL.push(boardArr[yPos + i][xPos + i])
                }
            }
            for (let j = 0; j < height; j++) {
                let diagWinArrDL = diagDL.slice(j, j + 4)
                if (checkWinArr(diagWinArrDL))  {
                alert(`Player ${playerTurn} wins!`)
                }
            }
        }


   
    winHor();
    winVert();
    winDiagR();
    winDiagL();
    winDiagDL();
    winDiagUL();
    

    
    
    
    
    
    
    
    
    }
    
    checkForWin();
    switchPlayer();
    updateHUD();
} 
