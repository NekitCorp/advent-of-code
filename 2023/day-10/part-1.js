// @ts-check

import { readInput } from "../utils.js";

/**
 * @param {string[][]} cells
 * @returns {[number, number]}
 */
function findStartCell(cells) {
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j] === "S") {
                return [i, j];
            }
        }
    }

    return [0, 0];
}

/**
 * @param {string[][]} cells
 * @param {number} i
 * @param {number} j
 * @param {number} fromI
 * @param {number} fromJ
 * @returns {number}
 */
function findCycleLength(cells, i, j, fromI, fromJ) {
    let steps = 0;

    while (true) {
        if (i < 0 || i >= cells.length || j < 0 || j >= cells[0].length || cells[i][j] === ".") {
            return -1;
        }

        switch (cells[i][j]) {
            case "S":
                return steps + 1;
            case "|": {
                if (i + 1 === fromI) {
                    (fromI = i), (fromJ = j), (i = i - 1), (j = j);
                } else {
                    (fromI = i), (fromJ = j), (i = i + 1), (j = j);
                }
                break;
            }
            case "-": {
                if (j + 1 === fromJ) {
                    (fromI = i), (fromJ = j), (i = i), (j = j - 1);
                } else {
                    (fromI = i), (fromJ = j), (i = i), (j = j + 1);
                }
                break;
            }
            case "L": {
                if (i - 1 === fromI) {
                    (fromI = i), (fromJ = j), (i = i), (j = j + 1);
                } else {
                    (fromI = i), (fromJ = j), (i = i - 1), (j = j);
                }
                break;
            }
            case "J": {
                if (j - 1 === fromJ) {
                    (fromI = i), (fromJ = j), (i = i - 1), (j = j);
                } else {
                    (fromI = i), (fromJ = j), (i = i), (j = j - 1);
                }
                break;
            }
            case "7": {
                if (i + 1 === fromI) {
                    (fromI = i), (fromJ = j), (i = i), (j = j - 1);
                } else {
                    (fromI = i), (fromJ = j), (i = i + 1), (j = j);
                }
                break;
            }
            case "F": {
                if (i + 1 === fromI) {
                    (fromI = i), (fromJ = j), (i = i), (j = j + 1);
                } else {
                    (fromI = i), (fromJ = j), (i = i + 1), (j = j);
                }
                break;
            }
            default:
                throw new Error(`Unknown symbol: ${cells[i][j]}, ${i}, ${j}`);
        }

        steps = steps + 1;
    }
}

/**
 * @param {number[]} arr
 * @returns {number[]}
 */
const findDuplicates = (arr) => {
    let sorted_arr = arr.slice().sort();
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    return results;
};

/**
 * @param {string[][]} cells
 * @param {number} i
 * @param {number} j
 * @returns {{ startSymbol: string, distance: number }}
 */
function findStartSymbol(cells, i, j) {
    const up = findCycleLength(cells, i - 1, j, i, j);
    const right = findCycleLength(cells, i, j + 1, i, j);
    const down = findCycleLength(cells, i + 1, j, i, j);
    const left = findCycleLength(cells, i, j - 1, i, j);

    const [distance] = findDuplicates([up, right, down, left]);

    if (distance === up && distance === down) {
        return { startSymbol: "|", distance: distance / 2 };
    } else if (distance === left && distance === right) {
        return { startSymbol: "-", distance: distance / 2 };
    } else if (distance === up && distance === right) {
        return { startSymbol: "L", distance: distance / 2 };
    } else if (distance === up && distance === left) {
        return { startSymbol: "J", distance: distance / 2 };
    } else if (distance === down && distance === left) {
        return { startSymbol: "7", distance: distance / 2 };
    } else if (distance === down && distance === right) {
        return { startSymbol: "F", distance: distance / 2 };
    }

    throw new Error("Unrecognized direction");
}

const input = readInput(import.meta.url);
const cells = input.split("\n").map((line) => line.split(""));

const [startI, startJ] = findStartCell(cells);

const { startSymbol, distance } = findStartSymbol(cells, startI, startJ);

console.log({ startSymbol, distance });
