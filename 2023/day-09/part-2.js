// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const histories = input.split("\n").map((h) => h.split(" ").map(Number));

let result = 0;

for (const history of histories) {
    const sequences = [history];

    while (!sequences[sequences.length - 1].every((i) => i === 0)) {
        const newSequence = [];
        const lastSequence = sequences[sequences.length - 1];

        for (let i = 1; i < lastSequence.length; i++) {
            newSequence.push(lastSequence[i] - lastSequence[i - 1]);
        }

        sequences.push(newSequence);
    }

    for (let i = sequences.length - 2; i >= 0; i--) {
        sequences[i].unshift(sequences[i][0] - sequences[i + 1][0]);
    }

    console.log(sequences.join("\n") + "\n\n");

    result += sequences[0][0];
}

console.log({ result });
