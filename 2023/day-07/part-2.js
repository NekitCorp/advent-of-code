// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const hands = input.split("\n");

/**
 * @type {[number, string, number][]}
 */
const handsArr = [];

for (const hand of hands) {
    const [cards, bid] = hand.split(" ");

    const map = {};

    for (const card of cards) {
        map[card] = (map[card] ?? 0) + 1;
    }

    const values = Object.values(map)
        .sort((a, b) => a - b)
        .join("");

    // Five of a kind – 7
    if (
        values === "5" ||
        (values === "14" && map.J === 1) ||
        (values === "14" && map.J === 4) ||
        (values === "23" && map.J === 2) ||
        (values === "23" && map.J === 3)
    ) {
        handsArr.push([7, cards, Number(bid)]);
        continue;
    }

    // Four of a kind – 6
    if (
        values === "14" ||
        (values === "113" && map.J === 1) ||
        (values === "113" && map.J === 3) ||
        (values === "122" && map.J === 2)
    ) {
        handsArr.push([6, cards, Number(bid)]);
        continue;
    }

    // Full house – 5
    if (values === "23" || (values === "122" && map.J === 1)) {
        handsArr.push([5, cards, Number(bid)]);
        continue;
    }

    // Three of a kind – 4
    if (
        Object.values(map).some((v) => v === 3) ||
        (values === "1112" && map.J === 1) ||
        (values === "1112" && map.J === 2)
    ) {
        handsArr.push([4, cards, Number(bid)]);
        continue;
    }

    // Two pair – 3
    if (values === "122") {
        handsArr.push([3, cards, Number(bid)]);
        continue;
    }

    // One pair – 2
    if (values === "1112" || map.J === 1) {
        handsArr.push([2, cards, Number(bid)]);
        continue;
    }

    // High card - 1
    handsArr.push([1, cards, Number(bid)]);
}

const ORDER = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

handsArr.sort((a, b) => {
    if (a[0] !== b[0]) {
        return a[0] - b[0];
    }

    for (let i = 0; i < a[1].length; i++) {
        if (ORDER.indexOf(a[1][i]) !== ORDER.indexOf(b[1][i])) {
            return ORDER.indexOf(b[1][i]) - ORDER.indexOf(a[1][i]);
        }
    }

    return 0;
});

const result = handsArr.reduce((a, b, i) => a + (i + 1) * b[2], 0);

console.log({ result });
