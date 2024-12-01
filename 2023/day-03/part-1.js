// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);

const rows = input.split("\n");

function isNumber(str) {
    return str !== undefined && /^\d+$/.test(str);
}

function isSymbol(str) {
    return str !== undefined && !isNumber(str) && str !== ".";
}

let result = 0;

for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
        if (isNumber(rows[i][j])) {
            let num = "";
            let isValid = false;

            while (isNumber(rows[i][j]) && j < rows[i].length) {
                num += rows[i][j];

                if (
                    isSymbol(rows[i - 1]?.[j - 1]) ||
                    isSymbol(rows[i - 1]?.[j]) ||
                    isSymbol(rows[i - 1]?.[j + 1]) ||
                    isSymbol(rows[i][j - 1]) ||
                    isSymbol(rows[i][j + 1]) ||
                    isSymbol(rows[i + 1]?.[j - 1]) ||
                    isSymbol(rows[i + 1]?.[j]) ||
                    isSymbol(rows[i + 1]?.[j + 1])
                ) {
                    isValid = true;
                }

                j += 1;
            }

            if (isValid) {
                result += Number(num);
            }
        }
    }
}

console.log(result);
