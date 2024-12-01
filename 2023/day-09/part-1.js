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
        sequences[i].push(sequences[i + 1].at(-1) + sequences[i].at(-1));
    }

    console.log(sequences.join("\n") + "\n\n");

    result += sequences[0].at(-1);
}

console.log({ result });
