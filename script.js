/* eslint-disable linebreak-style */
// const body = document.querySelector('body');
const board = document.querySelector('.board');

const tiles = [];

for (let i = 0; i < 9; i++) {
  const b = document.createElement('button');
  b.classList.add('tile');
  tiles.push(b);
}

const boardThickness = '2';

tiles[0].setAttribute('style',
    `border-bottom: ${boardThickness}px solid black; 
    border-right: ${boardThickness}px solid black`);

tiles[1].setAttribute('style',
    `border-bottom: ${boardThickness}px solid;
    border-right: ${boardThickness}px solid black`);

tiles[2].setAttribute('style',
    `border-bottom: ${boardThickness}px solid black`);

tiles[3].setAttribute('style',
    `border-bottom: ${boardThickness}px solid;
    border-right: ${boardThickness}px solid black`);

tiles[4].setAttribute('style',
    `border-bottom: ${boardThickness}px solid;
    border-right: ${boardThickness}px solid black`);

tiles[5].setAttribute('style',
    `border-bottom: ${boardThickness}px solid black`);

tiles[6].setAttribute('style',
    `border-right: ${boardThickness}px solid black`);

tiles[7].setAttribute('style',
    `border-right: ${boardThickness}px solid black`);

for (const b of tiles) {
  board.appendChild(b);
}
