// @ts-check

import { readInput, writeOutput } from "../utils.js";

const input = readInput(import.meta.url);
const line = input.split("\n");
const commands = line.map((line) => {
    const [direction, meters, color] = line.split(" ");
    return { direction, meters: Number(meters), color: color.slice(1, color.length - 1) };
});

/** @type {string[][]} */
const plan = [["#"]];
let i = 0,
    j = 0;

for (const { direction, meters } of commands) {
    console.log({ direction, meters, i, j });

    if (direction === "U") {
        for (let _ = 0; _ < meters; _++) {
            i -= 1;

            if (i < 0) {
                i = 0;
                plan.unshift([]);
            }

            plan[i][j] = "#";
        }
    }

    if (direction === "R") {
        for (let _ = 0; _ < meters; _++) {
            j += 1;
            plan[i][j] = "#";
        }
    }

    if (direction === "D") {
        for (let _ = 0; _ < meters; _++) {
            i += 1;

            if (!plan[i]) {
                plan.push([]);
            }

            plan[i][j] = "#";
        }
    }

    if (direction === "L") {
        for (let _ = 0; _ < meters; _++) {
            j -= 1;

            if (j < 0) {
                j = 0;

                for (let i = 0; i < plan.length; i++) {
                    plan[i].unshift(".");
                }
            }

            plan[i][j] = "#";
        }
    }
}

let m = plan.length;
let n = plan.reduce((max, row) => (row.length > max ? row.length : max), 0);

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (!plan[i][j]) {
            plan[i][j] = ".";
        }
    }
}

writeOutput(import.meta.url, plan.map((row) => row.join("")).join("\n"), "output-1");

plan.unshift([]);
plan.push([]);
m += 2;
for (let i = 0; i < m; i++) {
    plan[i].unshift(".");
    plan[i].push(".");
}
n += 2;

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (!plan[i][j]) {
            plan[i][j] = ".";
        }
    }
}

writeOutput(import.meta.url, plan.map((row) => row.join("")).join("\n"), "output-2");

function cleanOutsideCells() {
    /** @type {{i: number; j: number}[]} */
    const stack = [{ i: 0, j: 0 }];

    while (stack.length > 0) {
        const { i, j } = stack.pop();

        if (i < 0 || i >= m || j < 0 || j >= n || plan[i][j] !== ".") {
            continue;
        }

        plan[i][j] = " ";

        stack.push({ i: i - 1, j: j });
        stack.push({ i: i, j: j + 1 });
        stack.push({ i: i + 1, j: j });
        stack.push({ i: i, j: j - 1 });
    }
}

cleanOutsideCells();

writeOutput(import.meta.url, plan.map((row) => row.join("")).join("\n"), "output-3");

let sum = 0;

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (plan[i][j] !== " ") {
            sum += 1;
        }
    }
}

console.log({ sum });
