//
// global variables
//

let width = 800;
let height = 800;

let cellSize = 10;
let cellRadius = 0;

let intervalDelay = 100;

let rowsCount = width / cellSize;
let columnsCount = height / cellSize;

let cellsCount = rowsCount * columnsCount;

let activeCellsCount = 0;
let inactiveCellsCount = cellsCount - activeCellsCount;

let rows = [];

// Colors
let backgroundColor = "rgba(60, 60, 60, 1)";
let sandColor = "rgba(194, 178, 128, 1)";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//
function main() {
  drawBackground();

  populateTable();

  drawTable();

  setInterval(progressGeneration, intervalDelay);
}

main();

//
function drawBackground() {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//
function drawCell(x, y, size = cellSize, radius = cellRadius) {
  ctx.beginPath();
  ctx.roundRect(x, y, size, size, radius);
  ctx.fill();
}

//
function drawTable() {
  rows.forEach((row, rowIndex) => {
    row.forEach((column, colIndex) => {
      if (column) {
        activeCellsCount++;
        ctx.fillStyle = sandColor;
        drawCell(colIndex * cellSize, rowIndex * cellSize);
      } else {
        ctx.fillStyle = backgroundColor;
        drawCell(colIndex * cellSize, rowIndex * cellSize);
      }
    });
  });
  inactiveCellsCount = cellsCount - activeCellsCount;
}

//
function populateTable() {
  rows = [];
  for (let i = 0; i < rowsCount; i++) {
    let columns = [];
    for (let j = 0; j < columnsCount; j++) {
      // the chance of cell being active is 50/2/2 = 12.5%
      if (getRandomCellState() && getRandomCellState()) {
        columns.push(getRandomCellState());
      } else {
        columns.push(0);
      }
    }
    rows.push(columns);
  }
}

//
function progressGeneration() {
  for (let rowIndex = rowsCount - 1; rowIndex >= 0; rowIndex--) {
    rows[rowIndex].forEach((_column, colIndex) => {
      let topLeftCell,
        topMiddleCell,
        topRightCell,
        middleLeftCell,
        currentCell,
        middleRightCell,
        bottomLeftCell,
        bottomMiddleCell,
        bottomRightCell;

      topLeftCell =
        topMiddleCell =
        topRightCell =
        middleLeftCell =
        currentCell =
        middleRightCell =
        bottomLeftCell =
        bottomMiddleCell =
        bottomRightCell =
          0;

      // [1][2][3]
      // [4][5][6]
      // [7][8][9]

      if (rowIndex !== 0) {
        if (rows[rowIndex - 1][colIndex - 1])
          topLeftCell = rows[rowIndex - 1][colIndex - 1]; // [1]
        if (rows[rowIndex - 1][colIndex - 0])
          topMiddleCell = rows[rowIndex - 1][colIndex - 0]; // [3]
        if (rows[rowIndex - 1][colIndex + 1])
          topRightCell = rows[rowIndex - 1][colIndex + 1]; // [3]
      }

      if (rows[rowIndex - 0][colIndex - 1])
        middleLeftCell = rows[rowIndex - 0][colIndex - 1]; // [4]
      if (rows[rowIndex - 0][colIndex - 0])
        currentCell = rows[rowIndex - 0][colIndex - 0]; // [5]
      if (rows[rowIndex - 0][colIndex + 1])
        middleRightCell = rows[rowIndex - 0][colIndex + 1]; // [6]

      if (rowIndex !== rowsCount - 1) {
        if (rows[rowIndex + 1][colIndex - 1])
          bottomLeftCell = rows[rowIndex + 1][colIndex - 1]; // [7]
        if (rows[rowIndex + 1][colIndex - 0])
          bottomMiddleCell = rows[rowIndex + 1][colIndex - 0]; // [8]
        if (rows[rowIndex + 1][colIndex + 1])
          bottomRightCell = rows[rowIndex + 1][colIndex + 1]; // [9]
      }

      // logic

      if (currentCell) {
        if (rows[rowIndex + 1]) {
          if (rows[rowIndex + 1][colIndex - 0] === 0) {
            rows[rowIndex - 0][colIndex - 0] = 0; // currentCell
            rows[rowIndex + 1][colIndex - 0] = 1; // bottomMiddleCell
          } else if (rows[rowIndex + 1][colIndex - 1] === 0) {
            rows[rowIndex - 0][colIndex - 0] = 0; // currentCell
            rows[rowIndex + 1][colIndex - 1] = 1; // bottomLeftCell
          } else if (rows[rowIndex + 1][colIndex + 1] === 0) {
            rows[rowIndex - 0][colIndex - 0] = 0; // currentCell
            rows[rowIndex + 1][colIndex + 1] = 1; // bottomRightCell
          }
        }
      }
    });
  }

  drawTable();
}

// mouse events

let x, y;
let interval;
let pressed = false;

canvas.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  pressed = true;

  activateCell(x, y);

  interval = setInterval(() => {
    activateCell(x, y);
  }, intervalDelay);
});

canvas.addEventListener("mousemove", (e) => {
  if (pressed) {
    x = e.offsetX;
    y = e.offsetY;

    activateCell(x, y);
  }
});

window.addEventListener("mouseup", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  pressed = false;

  clearInterval(interval);
});

function activateCell(x, y) {
  let rowIndex, columnIndex;
  rowIndex = Math.floor(y / cellSize);
  columnIndex = Math.floor(x / cellSize);

  rows[rowIndex][columnIndex] = 1;
}

//
// Utility functions
//

function getRandomCellState() {
  return Math.round(Math.random());
}
