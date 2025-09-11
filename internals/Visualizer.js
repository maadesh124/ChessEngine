import chalk from "chalk";

const PIECE_SHAPES = {
  King0: "♔",
  Queen0: "♕",
  Rook0: "♖",
  Bishop0: "♗",
  Knight0: "♘",
  Pawn0: "♙",
  King1: "♚",
  Queen1: "♛",
  Rook1: "♜",
  Bishop1: "♝",
  Knight1: "♞",
  Pawn1: "♟"
};

export function drawBoard(boardState, squareWidth = 5, squareHeight = 3) {
  console.clear();
  for (let y = 7; y >= 0; y--) {
    for (let row = 0; row < squareHeight; row++) {
      let rowStr = "";
      for (let x = 0; x < 8; x++) {
        const cell = boardState[y][x];
        const isLightSquare = (x + y) % 2 === 0;
        let bg = isLightSquare ? chalk.bgBlueBright : chalk.bgGray;
        let fg = chalk.black;

        let display = " ".repeat(squareWidth);

        if (cell && row === Math.floor(squareHeight / 2)) {
          const symbol = PIECE_SHAPES[cell] || "?";
          const padding = Math.floor((squareWidth - 1) / 2);
          display =
            " ".repeat(padding) +
            symbol +
            " ".repeat(squareWidth - padding - 1);

          fg = cell.endsWith("0") ? chalk.white : chalk.black;
        }

        rowStr += bg(fg(display));
      }
      console.log(rowStr);
    }
  }
}
