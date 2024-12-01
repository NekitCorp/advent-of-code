// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const [instructions, network] = input.split(/\n\s*\n/);

const map = network.split("\n").reduce((acc, val) => {
    const [from, to] = val.split(" = ");
    const [left, right] = to.slice(1, to.length - 1).split(", ");

    acc[from] = { L: left, R: right };

    return acc;
}, {});

let current = "AAA";
let destination = "ZZZ";
let steps = 0;

while (current !== destination) {
    const direction = instructions[steps % instructions.length];
    current = map[current][direction];
    steps += 1;
}

console.log({ steps });
