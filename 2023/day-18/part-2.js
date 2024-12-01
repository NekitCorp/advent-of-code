// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);

/**
 * Direction.
 * @typedef {"R" | "D" | "L" | "U"} Direction
 */

/** @type {Direction[]} */
const DIR = ["R", "D", "L", "U"];

/**
 * @param {string} input
 * @returns {{ direction: Direction, meters: number }[]}
 */
function parseInput(input) {
    return input.split("\n").map((line) => {
        let [_, __, color] = line.split(" ");
        color = color.slice(2, color.length - 1);

        const direction = DIR[Number(color[color.length - 1])];
        const meters = parseInt(color.slice(0, color.length - 1), 16);

        console.log({ color, direction, meters });

        return { direction, meters };
    });
}

/**
 * @param {{ direction: Direction, meters: number }[]} commands
 */
function computeSquare(commands) {
    let x = 0;
    let y = 0;
    let area = 0;
    let perimeter = 0;

    for (const { direction, meters } of commands) {
        const x1 = x;
        const y1 = y;
        switch (direction) {
            case "R":
                x += meters;
                break;
            case "D":
                y += meters;
                break;
            case "L":
                x -= meters;
                break;
            case "U":
                y -= meters;
                break;
        }
        area += x1 * y - x * y1;
        perimeter += meters;
    }

    return Math.abs(area / 2) + perimeter / 2 + 1;
}

const commands = parseInput(input);
const square = computeSquare(commands);

console.log({ square });
