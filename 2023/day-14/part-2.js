// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const rows = input.split("\n").map((row) => row.split(""));
const m = rows.length;
const n = rows[0].length;
const CYCLES_NUMBER = 1_000_000_000;

function slideNorth() {
    for (let i = 1; i < m; i++) {
        for (let j = 0; j < n; j++) {
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
}

function slideSouth() {
    for (let i = m - 2; i >= 0; i--) {
        for (let j = 0; j < n; j++) {
            if (rows[i][j] === "O") {
                let currentRow = i;

                while (currentRow + 1 <= m - 1 && rows[currentRow + 1][j] === ".") {
                    rows[currentRow][j] = ".";
                    rows[currentRow + 1][j] = "O";
                    currentRow += 1;
                }
            }
        }
    }
}

function slideWest() {
    for (let i = 0; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (rows[i][j] === "O") {
                let currentCol = j;

                while (currentCol - 1 >= 0 && rows[i][currentCol - 1] === ".") {
                    rows[i][currentCol] = ".";
                    rows[i][currentCol - 1] = "O";
                    currentCol -= 1;
                }
            }
        }
    }
}

function slideEast() {
    for (let i = 0; i < m; i++) {
        for (let j = n - 2; j >= 0; j--) {
            if (rows[i][j] === "O") {
                let currentCol = j;

                while (currentCol + 1 <= n - 1 && rows[i][currentCol + 1] === ".") {
                    rows[i][currentCol] = ".";
                    rows[i][currentCol + 1] = "O";
                    currentCol += 1;
                }
            }
        }
    }
}

function cycle() {
    slideNorth();
    slideWest();
    slideSouth();
    slideEast();
}

function cacheKey() {
    return rows.map((row) => row.join("")).join("");
}

function findCycle() {
    const cache = new Map();

    for (let i = 1; i <= CYCLES_NUMBER; i++) {
        cycle();

        if (cache[cacheKey()]) {
            const firstRepeated = cache[cacheKey()];
            const cycleLength = i - firstRepeated;

            console.log(`Cycle detected! ${i} - ${firstRepeated} = ${cycleLength}`);

            for (let j = 0; j < (CYCLES_NUMBER - firstRepeated) % cycleLength; j++) {
                cycle();
            }

            break;
        } else {
            cache[cacheKey()] = i;
        }
    }
}

findCycle();

// calculate sum

let sum = 0;

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (rows[i][j] === "O") {
            sum += m - i;
        }
    }
}

console.log({ sum });
