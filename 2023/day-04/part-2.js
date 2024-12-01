// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);

function parse() {
    const cards = input.split("\n");
    const result = {};

    for (const card of cards) {
        const [cardNumber, data] = card.slice(4).split(": ");
        const [winningNumbers, yourNumber] = data.split(" | ");

        result[cardNumber.trim()] = {
            winningNumbers: winningNumbers.split(" ").filter(Boolean).map(Number),
            yourNumber: yourNumber.split(" ").filter(Boolean).map(Number),
        };
    }

    return result;
}

const parsed = parse();

const copies = new Array(Object.keys(parsed).length).fill(1);

for (const [cardNumber, { winningNumbers, yourNumber }] of Object.entries(parsed)) {
    const cardCopies = copies[Number(cardNumber) - 1];
    let winCount = 0;

    for (const winNum of winningNumbers) {
        if (yourNumber.includes(winNum)) {
            winCount += 1;
        }
    }

    for (let i = 0; i < winCount; i++) {
        const index = i + Number(cardNumber);
        copies[index] += cardCopies;
    }
}

console.log(copies.reduce((a, b) => a + b));
