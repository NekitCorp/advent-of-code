// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);

const rows = input.split("\n");

function isNumber(str) {
    return str !== undefined && /^\d+$/.test(str);
}

function isGear(str) {
    return str !== undefined && str === "*";
}

const totalGears = {};

for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
        if (isNumber(rows[i][j])) {
            let num = "";
            const gears = new Set();

            while (isNumber(rows[i][j]) && j < rows[i].length) {
                num += rows[i][j];

                if (isGear(rows[i - 1]?.[j - 1])) gears.add(`${i - 1}-${j - 1}`);
                if (isGear(rows[i - 1]?.[j])) gears.add(`${i - 1}-${j}`);
                if (isGear(rows[i - 1]?.[j + 1])) gears.add(`${i - 1}-${j + 1}`);
                if (isGear(rows[i][j - 1])) gears.add(`${i}-${j - 1}`);
                if (isGear(rows[i][j + 1])) gears.add(`${i}-${j + 1}`);
                if (isGear(rows[i + 1]?.[j - 1])) gears.add(`${i + 1}-${j - 1}`);
                if (isGear(rows[i + 1]?.[j])) gears.add(`${i + 1}-${j}`);
                if (isGear(rows[i + 1]?.[j + 1])) gears.add(`${i + 1}-${j + 1}`);

                j += 1;
            }

            for (const gear of gears.values()) {
                const [i, j] = gear.split("-");

                if (!totalGears[i]) {
                    totalGears[i] = {};
                }

                if (!totalGears[i][j]) {
                    totalGears[i][j] = [];
                }

                totalGears[i][j].push(Number(num));
            }
        }
    }
}

let result = 0;

for (const i of Object.keys(totalGears)) {
    for (const j of Object.keys(totalGears[i])) {
        if (totalGears[i][j].length === 2) {
            result += totalGears[i][j][0] * totalGears[i][j][1];
        }
    }
}

console.log(result);
