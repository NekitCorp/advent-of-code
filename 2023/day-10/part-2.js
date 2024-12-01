// @ts-check

import { readInput, writeOutput } from "../utils.js";

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

/**
 * @param {string[][]} cells
 * @param {number} fromI
 * @param {number} fromJ
 * @returns
 */
function paintCycle(cells, fromI, fromJ) {
    let i = fromI,
        j = fromJ;

    while (true) {
        if (cells[i][j] === "■") {
            return;
        }

        const char = cells[i][j];
        cells[i][j] = "■";

        if (char === "|") {
            if (i + 1 === fromI) {
                (fromI = i), (fromJ = j), (i = i - 1), (j = j);
            } else {
                (fromI = i), (fromJ = j), (i = i + 1), (j = j);
            }
        }

        if (char === "-") {
            if (j + 1 === fromJ) {
                (fromI = i), (fromJ = j), (i = i), (j = j - 1);
            } else {
                (fromI = i), (fromJ = j), (i = i), (j = j + 1);
            }
        }

        if (char === "L") {
            if (i - 1 === fromI) {
                (fromI = i), (fromJ = j), (i = i), (j = j + 1);
            } else {
                (fromI = i), (fromJ = j), (i = i - 1), (j = j);
            }
        }

        if (char === "J") {
            if (j - 1 === fromJ) {
                (fromI = i), (fromJ = j), (i = i - 1), (j = j);
            } else {
                (fromI = i), (fromJ = j), (i = i), (j = j - 1);
            }
        }

        if (char === "7") {
            if (i + 1 === fromI) {
                (fromI = i), (fromJ = j), (i = i), (j = j - 1);
            } else {
                (fromI = i), (fromJ = j), (i = i + 1), (j = j);
            }
        }

        if (char === "F") {
            if (i + 1 === fromI) {
                (fromI = i), (fromJ = j), (i = i), (j = j + 1);
            } else {
                (fromI = i), (fromJ = j), (i = i + 1), (j = j);
            }
        }
    }
}

/**
 * @param {string[][]} cells
 * @returns
 */
function cleanOutsideCycle(cells) {
    const stack = [{ i: 0, j: 0 }];

    while (stack.length > 0) {
        const { i, j } = stack.pop();

        if (
            i < 0 ||
            i >= cells.length ||
            j < 0 ||
            j >= cells[0].length ||
            cells[i][j] === "■" ||
            cells[i][j] === " "
        ) {
            continue;
        }

        cells[i][j] = " ";

        stack.push({ i: i - 1, j: j });
        stack.push({ i: i, j: j + 1 });
        stack.push({ i: i + 1, j: j });
        stack.push({ i: i, j: j - 1 });
    }
}

/**
 * @param {string} input
 * @param {string[][]} cells
 * @param {string} startSymbol
 * @returns
 */
function asciify(input, cells, startSymbol) {
    const cellsOrig = input.split("\n").map((line) => line.split(""));

    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j] !== "■" && cells[i][j] !== " ") {
                cells[i][j] = "*";
            }

            if (cells[i][j] === "■") {
                cells[i][j] = cellsOrig[i][j];

                if (cells[i][j] === "S") {
                    cells[i][j] = startSymbol;
                }
            }

            if (cells[i][j] === "-") {
                cells[i][j] = "–";
            }

            if (cells[i][j] === "L") {
                cells[i][j] = "└";
            }

            if (cells[i][j] === "J") {
                cells[i][j] = "┘";
            }

            if (cells[i][j] === "7") {
                cells[i][j] = "┐";
            }

            if (cells[i][j] === "F") {
                cells[i][j] = "┌";
            }
        }
    }
}

/**
 * @param {string[][]} cells
 * @returns {string[][]}
 */
function zoomX3(cells) {
    /** @type {string[][]} */
    const zoomedCells = [];

    for (let i = 0; i < cells.length; i++) {
        zoomedCells[i * 3] = [];
        zoomedCells[i * 3 + 1] = [];
        zoomedCells[i * 3 + 2] = [];

        for (let j = 0; j < cells[i].length; j++) {
            switch (cells[i][j]) {
                case " ":
                    zoomedCells[i * 3 + 0].push(" ", " ", " ");
                    zoomedCells[i * 3 + 1].push(" ", " ", " ");
                    zoomedCells[i * 3 + 2].push(" ", " ", " ");
                    break;
                case "*":
                    zoomedCells[i * 3 + 0].push(" ", " ", " ");
                    zoomedCells[i * 3 + 1].push(" ", "*", " ");
                    zoomedCells[i * 3 + 2].push(" ", " ", " ");
                    break;
                case "–":
                    zoomedCells[i * 3 + 0].push(" ", " ", " ");
                    zoomedCells[i * 3 + 1].push("–", "–", "–");
                    zoomedCells[i * 3 + 2].push(" ", " ", " ");
                    break;
                case "|":
                    zoomedCells[i * 3 + 0].push(" ", "|", " ");
                    zoomedCells[i * 3 + 1].push(" ", "|", " ");
                    zoomedCells[i * 3 + 2].push(" ", "|", " ");
                    break;
                case "└":
                    zoomedCells[i * 3 + 0].push(" ", "|", " ");
                    zoomedCells[i * 3 + 1].push(" ", "└", "–");
                    zoomedCells[i * 3 + 2].push(" ", " ", " ");
                    break;
                case "┘":
                    zoomedCells[i * 3 + 0].push(" ", "|", " ");
                    zoomedCells[i * 3 + 1].push("–", "┘", " ");
                    zoomedCells[i * 3 + 2].push(" ", " ", " ");
                    break;
                case "┐":
                    zoomedCells[i * 3 + 0].push(" ", " ", " ");
                    zoomedCells[i * 3 + 1].push("–", "┐", " ");
                    zoomedCells[i * 3 + 2].push(" ", "|", " ");
                    break;
                case "┌":
                    zoomedCells[i * 3 + 0].push(" ", " ", " ");
                    zoomedCells[i * 3 + 1].push(" ", "┌", "–");
                    zoomedCells[i * 3 + 2].push(" ", "|", " ");
                    break;
                default:
                    throw new Error(`Unrecognized symbol ${cells[i][j]}`);
            }
        }
    }

    return zoomedCells;
}

/**
 * @param {string[][]} cells
 * @returns
 */
function cleanOutsideCells(cells) {
    const stack = [{ i: 0, j: 0 }];

    while (stack.length > 0) {
        const { i, j } = stack.pop();

        if (
            i < 0 ||
            i >= cells.length ||
            j < 0 ||
            j >= cells[0].length ||
            (cells[i][j] !== " " && cells[i][j] !== "*")
        ) {
            continue;
        }

        cells[i][j] = "_";

        stack.push({ i: i - 1, j: j });
        stack.push({ i: i, j: j + 1 });
        stack.push({ i: i + 1, j: j });
        stack.push({ i: i, j: j - 1 });
    }
}

/**
 * @param {string[][]} cells
 * @returns {number}
 */
function findInnerCellsCount(cells) {
    let count = 0;

    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j] === "*") {
                count += 1;
            }
        }
    }

    return count;
}

function main() {
    const input = readInput(import.meta.url);
    const cells = input.split("\n").map((line) => line.split(""));

    const [startI, startJ] = findStartCell(cells);
    console.log({ startI, startJ });

    const { startSymbol, distance } = findStartSymbol(cells, startI, startJ);
    console.log({ startSymbol, distance });

    cells[startI][startJ] = startSymbol;
    paintCycle(cells, startI, startJ);
    writeOutput(import.meta.url, cells.map((c) => c.join("")).join("\n"), "output-1");

    cleanOutsideCycle(cells);
    writeOutput(import.meta.url, cells.map((c) => c.join("")).join("\n"), "output-2");

    asciify(input, cells, startSymbol);
    writeOutput(import.meta.url, cells.map((c) => c.join("")).join("\n"), "output-3");

    const zoomedCells = zoomX3(cells);
    writeOutput(import.meta.url, zoomedCells.map((c) => c.join("")).join("\n"), "output-4");

    cleanOutsideCells(zoomedCells);
    writeOutput(import.meta.url, zoomedCells.map((c) => c.join("")).join("\n"), "output-5");

    const count = findInnerCellsCount(zoomedCells);
    console.log({ count });
}

main();
