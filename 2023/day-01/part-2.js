// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const rows = input.split("\n");
const letters = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

/**
 *
 * @param {string} word
 * @param {number} i
 * @param {boolean} reverse
 * @returns {string}
 */
function checkLetter(word, i, reverse) {
    for (const letter of letters) {
        const value = reverse ? letter.split("").reverse().join("") : letter;

        for (let j = 0; j < value.length; j++) {
            if (word[i + (reverse ? -1 * j : j)] !== value[j]) {
                break;
            }

            if (j === value.length - 1) {
                return letter;
            }
        }
    }

    return "";
}

const result = rows.reduce((acc, val) => {
    let left = "";
    let right = "";

    for (let i = 0; i < val.length; i++) {
        if (checkLetter(val, i, false)) {
            left = letters.indexOf(checkLetter(val, i, false)) + 1 + "";
            break;
        }

        if (!Number.isNaN(Number(val[i]))) {
            left = val[i];
            break;
        }
    }

    for (let i = val.length - 1; i >= 0; i--) {
        if (checkLetter(val, i, true)) {
            right = letters.indexOf(checkLetter(val, i, true)) + 1 + "";
            break;
        }

        if (!Number.isNaN(Number(val[i]))) {
            right = val[i];
            break;
        }
    }

    return acc + Number(left + right);
}, 0);

console.log(result);
