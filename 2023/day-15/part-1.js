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

const sum = steps.reduce((acc, str) => {
    const v = hash(str);

    console.log(str, v);

    return acc + v;
}, 0);

console.log({ sum });
