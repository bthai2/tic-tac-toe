/* eslint-disable linebreak-style */
const body = document.querySelector('body');
const board = document.querySelector('.board');

const tiles = [];

for (let i = 0; i < 9; i++) {
  const b = document.createElement('button');
  b.classList.add('tile');
  b.textContent = i+1;
  tiles.push(b);
}

tiles[0].setAttribute('style',
    'border-bottom: 2px solid black; border-right: 2px solid black');

for (const b of tiles) {
  board.appendChild(b);
}
