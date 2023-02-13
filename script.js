/* eslint-disable linebreak-style */
// const body = document.querySelector('body');
const boardDisplay = document.querySelector('.board');
const scoreText1 = document.querySelector('.p1ScoreText');
const scoreText2 = document.querySelector('.p2ScoreText');

// eslint-disable-next-line require-jsdoc
class Board {
  // eslint-disable-next-line require-jsdoc
  constructor() {
    this.tiles = [];
    this._boardThickness = 8;
    this.initBoard();
  }

  // eslint-disable-next-line require-jsdoc
  get board() {
    return this.tiles;
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
};

const p1Score = 0;
const p2Score = 0;

const board = new Board();

for (const b of board.board) {
  boardDisplay.appendChild(b);
}
