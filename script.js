let width, height;
width = height = 400;
let resolution = 10;
let size = width / resolution;

let grid = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(245);

  for (let i = 0; i < resolution; i++) {
    let cells = [];
    for (let j = 0; j < resolution; j++) {
      cells.push(getRandomInt(2));
    }
    grid.push(cells);
  }

  // x = row index, y = column index.
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      let cell = grid[x][y];

      stroke(100, 100, 100);
      //noStroke();

      if (cell === 1) {
        fill(x * y, 0, 255 - x * y);
      } else {
        noFill();
      }

      square(x * size, y * size, size);
    }
  }
}
