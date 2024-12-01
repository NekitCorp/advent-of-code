// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const lines = input.split("\n");

const expandRows = [];

for (let i = 0; i < lines.length; i++) {
    if (lines[i].split("").every((c) => c === ".")) {
        expandRows.push(i);
    }
}

const expandCols = [];

for (let i = 0; i < lines[0].length; i++) {
    let valid = true;

    for (let j = 0; j < lines.length; j++) {
        if (lines[j][i] !== ".") {
            valid = false;
            break;
        }
    }

    if (valid) {
        expandCols.push(i);
    }
}

console.log({ expandRows, expandCols, size: `${lines.length}x${lines[0].length}` });

for (let i = 0; i < expandRows.length; i++) {
    const row = expandRows[i];

    lines.splice(row + i, 0, ".".repeat(lines[0].length));
}

for (let i = 0; i < expandCols.length; i++) {
    for (let j = 0; j < lines.length; j++) {
        const line = lines[j].split("");
        line.splice(i + expandCols[i], 0, ".");
        lines[j] = line.join("");
    }
}

console.log({ size: `${lines.length}x${lines[0].length}` });

const galaxies = [];

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === "#") {
            galaxies.push([i, j]);
        }
    }
}

console.log({ galaxies });

let sum = 0;

for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        const dist =
            Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1]);
        sum += dist;

        // console.log(`${i + 1} -> ${j + 1} = ${dist}`);
    }
}

console.log({ sum });
