// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const rows = input.split("\n");

function parseInput() {
    const result = [];

    for (let i of rows) {
        i = i.slice(5);
        const [game, data] = i.split(": ");
        const sets = data.split("; ");

        result.push({
            game: Number(game),
            sets: sets.map((set) => {
                return set
                    .split(", ")
                    .reduce(
                        (acc, val) => ({ ...acc, [val.split(" ")[1]]: Number(val.split(" ")[0]) }),
                        {}
                    );
            }),
        });
    }

    return result;
}

// only 12 red cubes, 13 green cubes, and 14 blue cubes?

let result = 0;

for (const { game, sets } of parseInput()) {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    for (const set of sets) {
        maxRed = Math.max(maxRed, set.red ?? 0);
        maxGreen = Math.max(maxGreen, set.green ?? 0);
        maxBlue = Math.max(maxBlue, set.blue ?? 0);
    }

    result += maxRed * maxGreen * maxBlue;
}

console.log(result);
