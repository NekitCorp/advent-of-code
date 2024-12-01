// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const steps = input.split(",");

/**
 * @param {string} str
 * @returns {number}
 */
function hash(str) {
    let result = 0;

    for (const char of str) {
        result += char.charCodeAt(0);
        result *= 17;
        result %= 256;
    }

    return result;
}

const boxes = new Array(256);
const strToFocal = {};

for (const step of steps) {
    if (step.includes("=")) {
        const [str, focal] = step.split("=");
        const box = hash(str);

        if (!boxes[box]) {
            boxes[box] = [];
        }

        const index = boxes[box].indexOf(str);

        if (index === -1) {
            boxes[box].push(str);
        }

        strToFocal[str] = Number(focal);
    } else if (step.includes("-")) {
        const [str] = step.split("-");
        const box = hash(str);

        if (!boxes[box]) {
            continue;
        }

        const index = boxes[box].indexOf(str);

        if (index > -1) {
            boxes[box].splice(index, 1);
        }
    }
}

console.log({ boxes, strToFocal });

let sum = 0;

for (let i = 0; i < 256; i++) {
    if (!boxes[i]) {
        continue;
    }

    for (let j = 0; j < boxes[i].length; j++) {
        sum += (i + 1) * (j + 1) * strToFocal[boxes[i][j]];
    }
}

console.log({ sum });
