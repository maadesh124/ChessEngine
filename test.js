import Board from "./Board.js";
import { drawBoard } from "./Visualizer.js";

const board = new Board();
drawBoard(board, 7, 3.5);

board.move([4, 1], [4, 3]); // e2 to e4
drawBoard(board);

// // Another move
// board.move([4, 6], [4, 4]); // e7 to e5
// drawBoard(board);
