// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);

function parse() {
    const cards = input.split("\n");
    const result = {};

    for (const card of cards) {
        const [cardNumber, data] = card.slice(5).split(": ");
        const [winningNumbers, yourNumber] = data.split(" | ");

        result[cardNumber] = {
            winningNumbers: winningNumbers.split(" ").filter(Boolean).map(Number),
            yourNumber: yourNumber.split(" ").filter(Boolean).map(Number),
        };
    }

    return result;
}

let result = 0;

for (const [cardNumber, { winningNumbers, yourNumber }] of Object.entries(parse())) {
    let count = 0;

    for (const winNum of winningNumbers) {
        if (yourNumber.includes(winNum)) {
            count += 1;
        }
    }

    if (count > 0) {
        result += Math.pow(2, count - 1);
    }
}

console.log(result);
