/* eslint-disable linebreak-style */
const body = document.querySelector('body');
let boardDisplay = document.querySelector('.board');
const scoreText1 = document.querySelector('.p1ScoreText');
const scoreText2 = document.querySelector('.p2ScoreText');

let p1Turn = true;

// eslint-disable-next-line require-jsdoc
function onTileClicked() {
  if (this.textContent != '') return;
  if (p1Turn) {
    this.textContent = p1._type;
    this.style.color = 'blue';
  } else {
    this.textContent = p2._type;
    this.style.color = 'red';
  }
  this.style.borderColor = 'black';
  checkGameOver();
  p1Turn = !p1Turn;
}

// eslint-disable-next-line require-jsdoc
function toggleButtons() {
  board.tiles.forEach((b) => b.disabled = !b.disabled);
}

// eslint-disable-next-line require-jsdoc
function toggleBoard() {
  boardDisplay.style.visibility = 'hidden';
}

// eslint-disable-next-line require-jsdoc
function switchBoardDisplay() {
  body.removeChild(body.lastChild);

  const newBoard = document.createElement('div');
  newBoard.classList.add('board');
  boardDisplay = document.querySelector('.board');

  body.appendChild(newBoard);

  board = new Board();
}

// eslint-disable-next-line require-jsdoc
function addButtons() {
  const div = document.createElement('div');
  div.classList.add('gameOver');
  div.textContent = 'Game Over';

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');

  const startOverBtn = document.createElement('button');
  startOverBtn.classList.add('startOver');
  startOverBtn.textContent = 'Start Over';
  startOverBtn.addEventListener('click', () => {
    p1.resetScore();
    p2.resetScore();
    updateScoreBoard(p1, p2);
    switchBoardDisplay();
  });
  buttons.appendChild(startOverBtn);

  const playAgainBtn = document.createElement('button');
  playAgainBtn.classList.add('playAgain');
  playAgainBtn.textContent = 'Play Again';
  playAgainBtn.addEventListener('click', switchBoardDisplay);
  buttons.appendChild(playAgainBtn);

  div.appendChild(buttons);

  body.removeChild(boardDisplay);
  body.appendChild(div);
}

// eslint-disable-next-line require-jsdoc
function gameOver() {
  board.tiles.forEach((b) => b.textContent = '');
  toggleButtons();
  //   toggleBoard();
  addButtons();
  (p1Turn) ? p1.wins() : p2.wins();
  updateScoreBoard(p1, p2);
}

// eslint-disable-next-line require-jsdoc
function checkGameOver() {
  const tiles = board.convertTilesToArray();
  // rows
  const rows =
    (tiles[0] !== '' && tiles[0] == tiles[1] && tiles[0] == tiles[2]) ||
    (tiles[3] !== '' && tiles[3] == tiles[4] && tiles[3] == tiles[5]) ||
    (tiles[6] !== '' && tiles[6] == tiles[7] && tiles[6] == tiles[8]);
  // columns
  const cols =
    (tiles[0] !== '' && tiles[0] == tiles[3] && tiles[0] == tiles[6]) ||
    (tiles[1] !== '' && tiles[1] == tiles[4] && tiles[1] == tiles[7]) ||
    (tiles[2] !== '' && tiles[2] == tiles[5] && tiles[2] == tiles[8]);
  // diagonal
  const diags =
    (tiles[0] !== '' && tiles[0] == tiles[4] && tiles[0] == tiles[8]) ||
    (tiles[2] !== '' && tiles[2] == tiles[4] && tiles[2] == tiles[6]);

  if (rows || cols || diags) {
    gameOver();
  }
}

// eslint-disable-next-line require-jsdoc
class Board {
  // eslint-disable-next-line require-jsdoc
  constructor() {
    this.tiles = [];
    this._boardThickness = 8;
    this.initBoard();
    this.updateBoardDisplay();
  }

  // eslint-disable-next-line require-jsdoc
  convertTilesToArray() {
    const arr = [];
    for (const b of this.tiles) {
      arr.push(b.textContent);
    }
    return arr;
  }

  // eslint-disable-next-line require-jsdoc
  set boardThickness(val) {
    if (typeof(val) === 'number' && val > 0) {
      this._boardThickness = val;
    } else {
      alert(`Could not set board thickness to ${val}`);
    }
  }

  // eslint-disable-next-line require-jsdoc
  initBoard() {
    if (this.tiles.length === 0) {
      for (let i = 0; i < 9; i++) {
        const b = document.createElement('button');
        b.classList.add('tile');
        b.addEventListener('click', onTileClicked);
        this.tiles.push(b);
      }
      this.tiles[0].setAttribute('style',
          `border-bottom: ${this._boardThickness}px solid black; 
            border-right: ${this._boardThickness}px solid black`);

      this.tiles[1].setAttribute('style',
          `border-bottom: ${this._boardThickness}px solid;
            border-right: ${this._boardThickness}px solid black`);

      this.tiles[2].setAttribute('style',
          `border-bottom: ${this._boardThickness}px solid black`);

      this.tiles[3].setAttribute('style',
          `border-bottom: ${this._boardThickness}px solid;
            border-right: ${this._boardThickness}px solid black`);

      this.tiles[4].setAttribute('style',
          `border-bottom: ${this._boardThickness}px solid;
            border-right: ${this._boardThickness}px solid black`);

      this.tiles[5].setAttribute('style',
          `border-bottom: ${this._boardThickness}px solid black`);

      this.tiles[6].setAttribute('style',
          `border-right: ${this._boardThickness}px solid black`);

      this.tiles[7].setAttribute('style',
          `border-right: ${this._boardThickness}px solid black`);
    }
  }

  // eslint-disable-next-line require-jsdoc
  updateBoardDisplay() {
    boardDisplay = document.querySelector('.board');
    for (const b of this.tiles) {
      boardDisplay.appendChild(b);
    }
  }
};

// eslint-disable-next-line require-jsdoc
function updateScoreBoard(player1, player2) {
  scoreText1.textContent = player1.score;
  scoreText2.textContent = player2.score;
}

// eslint-disable-next-line require-jsdoc
class Player {
  // eslint-disable-next-line require-jsdoc
  constructor(type) {
    this._score = 0;
    this._type = type;
  }

  // eslint-disable-next-line require-jsdoc
  get type() {
    return this._type;
  }

  // eslint-disable-next-line require-jsdoc
  get score() {
    return this._score;
  }

  // eslint-disable-next-line require-jsdoc
  resetScore() {
    this._score = 0;
  }

  // eslint-disable-next-line require-jsdoc
  wins() {
    this._score += 1;
  }
};

let board = new Board();

const p1 = new Player('X'); // can set X to user input in the future
const p2 = new Player('O');

// p1.wins();
// updateScoreBoard(p1, p2);
// console.log(p1.score);
