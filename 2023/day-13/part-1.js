// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const patterns = input.split(/\n\s*\n/).map((p) => p.split("\n"));

/**
 * @param {string[]} pattern
 * @param {number} j
 * @returns {string}
 */
function getColumn(pattern, j) {
    let column = "";

    for (let i = 0; i < pattern.length; i++) {
        column += pattern[i][j];
    }

    return column;
}

/**
 * @param {string[]} pattern
 * @returns {number}
 */
function findVerticalReflection(pattern) {
    for (let i = 1; i < pattern[0].length; i++) {
        let left = i - 1;
        let right = i;

        while (getColumn(pattern, left) === getColumn(pattern, right)) {
            if (left === 0 || right === pattern[0].length - 1) {
                return i;
            }

            left -= 1;
            right += 1;
        }
    }

    return -1;
}

/**
 * @param {string[]} pattern
 * @returns {number}
 */
function findHorizontalReflection(pattern) {
    for (let i = 1; i < pattern.length; i++) {
        let left = i - 1;
        let right = i;

        while (pattern[left] === pattern[right]) {
            if (left === 0 || right === pattern.length - 1) {
                return i;
            }

            left -= 1;
            right += 1;
        }
    }

    return -1;
}

let result = 0;

for (const pattern of patterns) {
    const vert = findVerticalReflection(pattern);
    const horz = findHorizontalReflection(pattern);

    if (vert !== -1 && horz !== -1) {
        throw new Error(`Double reflection: ${JSON.stringify({ vert, horz })}`);
    }

    if (vert !== -1) {
        result += vert;
    }

    if (horz !== -1) {
        result += horz * 100;
    }

    console.log({ vert, horz });
}

console.log({ result });
