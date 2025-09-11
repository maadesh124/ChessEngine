import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import Board from "./Board.js";
import fs from "fs";
import { drawBoard } from "./Visualizer.js";

const rl = readline.createInterface({ input, output });
let game = new Board();
let movesPlayed = "";
async function play() {
  console.log(`${game.play} 's turn`);
  let input = await rl.question("src=");
  fs.appendFileSync("input.txt", input + "\n", "utf-8");
  if (input === "q") return false;
  input = parseInt(input);
  const src = [Math.floor(input / 10), input % 10];
  input = await rl.question("dst=");
  fs.appendFileSync("input.txt", input + "\n", "utf-8");
  const dst = [Math.floor(input / 10), input % 10];

  console.log(`src=${src[0]} ,${src[1]}  dst=${dst[0]} ,${dst[1]}`);
  let res = game.move(src, dst);
  drawBoard(game, 7, 3.5);
  console.log(`result=${res}`);
  if (res === Board.PROMOTE) {
    let prom = await rl.question("Promtion Piece=");
    res = game.promote(dst, prom);
    drawBoard(game, 7, 3.5);
    console.log(`result=${res}`);
  }

  return true;
}

function readFileAsInts(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");

  const numbers = data
    .split(/\r?\n/)
    .filter(line => line)
    .map(line => parseInt(line, 10));

  return numbers;
}

async function playFromFile(path) {
  const arr = readFileAsInts("./input.txt");
  let src = [],
    dst = [];
  let k1 = 0,
    k2 = 0;
  for (let i = 0; i < arr.length; i++)
    if (i % 2 == 0) src[k1++] = arr[i];
    else dst[k2++] = arr[i];

  for (let i = 0; i < src.length; i++) {
    console.log(`\n${game.play}'s play *****`);
    console.log(`do you want to move ${src[i]}-->${dst[i]}`);
    const s = [Math.floor(src[i] / 10), src[i] % 10];
    const t = [Math.floor(dst[i] / 10), dst[i] % 10];
    await rl.question("Press Any key");
    let res = game.move(s, t);
    drawBoard(game, 7, 3.5);
    console.log(`result= ${res}`);
  }
}

async function main() {
  fs.writeFileSync("input.txt", "", "utf-8");
  while (await play());
  rl.close();
}

try {
  await main();
} catch (err) {
  console.error("Error caught:", err);
}
