/* eslint-disable linebreak-style */
const body = document.querySelector('body');
let boardDisplay = document.querySelector('.board');
const scoreText1 = document.querySelector('.p1ScoreText');
const scoreText2 = document.querySelector('.p2ScoreText');

let p1Turn = true;

/**
 * Function that is called when a tile is clicked.
 */
function onTileClicked() {
  // ignore if tile that was clicked already has a value
  if (this.textContent != '') return;

  if (p1Turn) {
    this.textContent = p1._type;
    this.style.color = 'blue';
  } else {
    this.textContent = p2._type;
    this.style.color = 'red';
  }
  this.style.borderColor = 'black';

  // check if the game ends after the tile value changes
  checkGameOver();

  // switch turns
  p1Turn = !p1Turn;
}

/**
 * Function to enable/disable the buttons on the board.
 */
function toggleButtons() {
  board.tiles.forEach((b) => b.disabled = !b.disabled);
}

/**
 * Function to remove the game over display and add
 * back the board div to restart the game.
 */
function switchBoardDisplay() {
  body.removeChild(body.lastChild);

  const newBoard = document.createElement('div');
  newBoard.classList.add('board');
  boardDisplay = document.querySelector('.board');

  body.appendChild(newBoard);

  board = new Board(); // reset board
}

/**
 * Function to remove the board and add the
 * game over display.
 */
function addButtons() {
  const div = document.createElement('div');
  div.classList.add('gameOver');
  div.textContent = 'Game Over';

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');

  // add buttons
  const startOverBtn = document.createElement('button');
  startOverBtn.classList.add('startOver');
  startOverBtn.textContent = 'Start Over';
  startOverBtn.addEventListener('click', () => {
    p1Turn = true; // start over resets to p1 turn
    p1.resetScore();
    p2.resetScore();
    updateScoreBoard(p1, p2);
    switchBoardDisplay();
  });
  buttons.appendChild(startOverBtn);

  const playAgainBtn = document.createElement('button');
  playAgainBtn.classList.add('playAgain');
  playAgainBtn.textContent = 'Play Again';
  // play again restarts the game with the opposite player going first
  playAgainBtn.addEventListener('click', switchBoardDisplay);
  buttons.appendChild(playAgainBtn);

  div.appendChild(buttons);

  body.removeChild(boardDisplay);
  body.appendChild(div);
}

/**
 * Function that ends the game and updates displays.
 */
function gameOver() {
  // reset the text of the buttons
  board.tiles.forEach((b) => b.textContent = '');
  toggleButtons(); // disable the buttons
  addButtons(); // add game over buttons

  // the player that went last and triggered this function
  // is the player that won the game
  (p1Turn) ? p1.wins() : p2.wins();
  updateScoreBoard(p1, p2); // update the scoreboard with the new score
}

/**
 * Function to check if the game should end and calls the
 * gameOver() function if it does.
 */
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

/**
 * Class that represents the tic-tac-toe board.
 * Keeps track of the tiles and board thickness.
 */
class Board {
  /**
   * Initializes an empty board
   */
  constructor() {
    this.tiles = [];
    this._boardThickness = 8;
    this.initBoard();
    this.updateBoardDisplay();
  }

  /**
   * Function to convert the tiles from a button array
   * to a string representation.
   *
   * @return {Array} a array of strings representing the board
   */
  convertTilesToArray() {
    const arr = [];
    for (const b of this.tiles) {
      arr.push(b.textContent);
    }
    return arr;
  }

  /**
   * Function that changes the board thickness.
   * Defaults to 8px but this allows adjustment to
   * the board if needed.
   *
   * @param {number} val the value to change the board thickness to
   */
  set boardThickness(val) {
    if (typeof(val) === 'number' && val > 0) {
      this._boardThickness = val;
      this.tiles = [];
      this.initBoard();
      this.updateBoardDisplay();
    } else {
      alert(`Could not set board thickness to ${val}`);
    }
  }

  /**
   * Function that initializes the board with the given
   * board thickness.
   */
  initBoard() {
    if (this.tiles.length === 0) {
      // add the buttons to tiles
      for (let i = 0; i < 9; i++) {
        const b = document.createElement('button');
        b.classList.add('tile');
        b.addEventListener('click', onTileClicked);
        this.tiles.push(b);
      }

      // Set up the board using border of the buttons
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

  /**
   * Function to add the tiles to the board div on the
   * document.
   */
  updateBoardDisplay() {
    boardDisplay = document.querySelector('.board');
    for (const b of this.tiles) {
      boardDisplay.appendChild(b);
    }
  }
};

/**
 * Function to update the scoreboard display with
 * the new player score values.
 *
 * @param {Player} player1 the first player
 * @param {Player} player2 the second player
 */
function updateScoreBoard(player1, player2) {
  scoreText1.textContent = player1.score;
  scoreText2.textContent = player2.score;
}

/**
 * Class that represents a player and stores
 * the player's score and mark type (x or o)
 */
class Player {
  /**
   * Initializes the player with score of 0
   * @param {String} type the type of mark
   */
  constructor(type) {
    this._score = 0;
    this._type = type;
  }

  /**
   * Getter method for the player's mark type
   */
  get type() {
    return this._type;
  }

  /**
   * Getter method for the player's score
   */
  get score() {
    return this._score;
  }

  /**
   * Function to reset the player's score to 0
   */
  resetScore() {
    this._score = 0;
  }

  /**
   * Function to update the player's score if they won
   */
  wins() {
    this._score += 1;
  }
};

// make board for the game
let board = new Board();

// initialize new players
const p1 = new Player('X'); // can set X to user input in the future
const p2 = new Player('O');

// p1.wins();
// updateScoreBoard(p1, p2);
// console.log(p1.score);
