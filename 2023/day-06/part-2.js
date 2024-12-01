// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);

const time = Number(
    input
        .split("\n")[0]
        .replace("Time:", "")
        .split(" ")
        .filter(Boolean)
        .reduce((a, b) => a + b)
);
const distance = Number(
    input
        .split("\n")[1]
        .replace("Distance:", "")
        .split(" ")
        .filter(Boolean)
        .reduce((a, b) => a + b)
);

console.log({ time, distance });

let ways = 0;

for (let j = 1; j <= time; j++) {
    if (j * (time - j) > distance) {
        ways += 1;
    }
}

console.log({ ways });
