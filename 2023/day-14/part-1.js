// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const rows = input.split("\n").map((row) => row.split(""));

// slide north

// skip first row
for (let i = 1; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
        if (rows[i][j] === "O") {
            let currentRow = i;

            while (currentRow - 1 >= 0 && rows[currentRow - 1][j] === ".") {
                rows[currentRow][j] = ".";
                rows[currentRow - 1][j] = "O";
                currentRow -= 1;
            }
        }
    }
}

console.log(rows.map((row) => row.join("")).join("\n"));

// calculate sum

let sum = 0;

for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
        if (rows[i][j] === "O") {
            sum += rows.length - i;
        }
    }
}

console.log({ sum });
