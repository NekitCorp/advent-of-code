// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);

const times = input.split("\n")[0].replace("Time:", "").split(" ").filter(Boolean).map(Number);
const distances = input
    .split("\n")[1]
    .replace("Distance:", "")
    .split(" ")
    .filter(Boolean)
    .map(Number);
const n = times.length;

let result = 1;

for (let i = 0; i < n; i++) {
    const time = times[i];
    const distance = distances[i];

    let ways = 0;

    for (let j = 1; j <= time; j++) {
        if (j * (time - j) > distance) {
            ways += 1;
        }
    }

    console.log(i, ways);

    result *= ways;
}

console.log({ result });
