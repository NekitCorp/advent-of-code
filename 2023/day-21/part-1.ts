import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const garden = input.split("\n").map((line) => line.split(""));

function findStart(garden: string[][]): [i: number, j: number] {
    for (let i = 0; i < garden.length; i++) {
        for (let j = 0; j < garden[i].length; j++) {
            if (garden[i][j] === "S") {
                return [i, j];
            }
        }
    }

    return [-1, -1];
}

function step() {
    const points: [i: number, j: number][] = [];

    for (let i = 0; i < garden.length; i++) {
        for (let j = 0; j < garden[i].length; j++) {
            if (garden[i][j] === "O") {
                points.push([i, j]);
            }
        }
    }

    while (points.length > 0) {
        const [i, j] = points.shift()!;

        garden[i][j] = ".";
        if (garden[i - 1]?.[j]) garden[i - 1][j] = garden[i - 1][j] === "#" ? "#" : "O";
        if (garden[i + 1]?.[j]) garden[i + 1][j] = garden[i + 1][j] === "#" ? "#" : "O";
        if (garden[i]?.[j - 1]) garden[i][j - 1] = garden[i][j - 1] === "#" ? "#" : "O";
        if (garden[i]?.[j + 1]) garden[i][j + 1] = garden[i][j + 1] === "#" ? "#" : "O";
    }
}

const [i, j] = findStart(garden);
garden[i][j] = "O";

for (let i = 0; i < 64; i++) {
    step();
}

let count = 0;

for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[i].length; j++) {
        if (garden[i][j] === "O") {
            count += 1;
        }
    }
}

console.log(garden.map((line) => line.join("")).join("\n"));
console.log({ count });
