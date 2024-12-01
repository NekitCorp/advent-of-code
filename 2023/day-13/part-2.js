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
 * @param {number} originalVert
 * @returns {number}
 */
function findVerticalReflection(pattern, originalVert) {
    for (let i = 1; i < pattern[0].length; i++) {
        let left = i - 1;
        let right = i;

        while (getColumn(pattern, left) === getColumn(pattern, right)) {
            if (left === 0 || right === pattern[0].length - 1) {
                if (originalVert === i) {
                    break;
                } else {
                    return i;
                }
            }

            left -= 1;
            right += 1;
        }
    }

    return -1;
}

/**
 * @param {string[]} pattern
 * @param {number} originalHorz
 * @returns {number}
 */
function findHorizontalReflection(pattern, originalHorz) {
    for (let i = 1; i < pattern.length; i++) {
        let left = i - 1;
        let right = i;

        while (pattern[left] === pattern[right]) {
            if (left === 0 || right === pattern.length - 1) {
                if (originalHorz === i) {
                    break;
                } else {
                    return i;
                }
            }

            left -= 1;
            right += 1;
        }
    }

    return -1;
}

/**
 * @param {string} str
 * @param {number} index
 * @param {string} chr
 * @returns {string}
 */
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

/**
 * @param {string[]} pattern
 * @returns {number}
 */
function processPattern(pattern) {
    const originalVert = findVerticalReflection(pattern, -1);
    const originalHorz = findHorizontalReflection(pattern, -1);

    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[0].length; j++) {
            const originalChar = pattern[i][j];

            pattern[i] = setCharAt(pattern[i], j, pattern[i][j] === "." ? "#" : ".");

            const vert = findVerticalReflection(pattern, originalVert);
            const horz = findHorizontalReflection(pattern, originalHorz);

            if (vert !== -1 && vert !== originalVert) {
                return vert;
            }

            if (horz !== -1 && horz !== originalHorz) {
                return horz * 100;
            }

            pattern[i] = setCharAt(pattern[i], j, originalChar);
        }
    }

    throw new Error("New reflection not found.");
}

let result = 0;

for (const pattern of patterns) {
    result += processPattern(pattern);
}

console.log({ result });
