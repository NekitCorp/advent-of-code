// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const matrix = input.split("\n").map((row) => row.split(""));

/**
 * Direction.
 * @typedef {'top' | 'right' | 'bottom' | 'left'} Direction
 */

/**
 * @param {number} i
 * @param {number} j
 * @param {Direction} dir
 * @returns {[number, number]}
 */
function nextCell(i, j, dir) {
    switch (dir) {
        case "top":
            return [i - 1, j];
        case "right":
            return [i, j + 1];
        case "bottom":
            return [i + 1, j];
        case "left":
            return [i, j - 1];
    }
}

/** @type {Record<string, (Direction)[]>} */
const cache = {};

/**
 * @param {number} i
 * @param {number} j
 * @param {Direction} dir
 */
function beam(i, j, dir) {
    // check boundaries
    if (i < 0 || i >= matrix.length || j < 0 || j >= matrix[0].length) {
        return;
    }

    const cacheKey = `${i}-${j}`;

    if (cache[cacheKey] && cache[cacheKey].includes(dir)) {
        return;
    } else {
        cache[cacheKey] = [...(cache[cacheKey] ?? []), dir];
    }

    const [iNext, jNext] = nextCell(i, j, dir);

    if ([".", "#"].includes(matrix[i][j])) {
        matrix[i][j] = "#";
        beam(iNext, jNext, dir);
    } else if (matrix[i][j] === "-") {
        if (["left", "right"].includes(dir)) {
            beam(iNext, jNext, dir);
        } else {
            beam(i, j - 1, "left");
            beam(i, j + 1, "right");
        }
    } else if (matrix[i][j] === "|") {
        if (["top", "bottom"].includes(dir)) {
            beam(iNext, jNext, dir);
        } else {
            beam(i - 1, j, "top");
            beam(i + 1, j, "bottom");
        }
    } else if (matrix[i][j] === "/") {
        switch (dir) {
            case "top":
                return beam(i, j + 1, "right");
            case "right":
                return beam(i - 1, j, "top");
            case "bottom":
                return beam(i, j - 1, "left");
            case "left":
                return beam(i + 1, j, "bottom");
        }
    } else if (matrix[i][j] === "\\") {
        switch (dir) {
            case "top":
                return beam(i, j - 1, "left");
            case "right":
                return beam(i + 1, j, "bottom");
            case "bottom":
                return beam(i, j + 1, "right");
            case "left":
                return beam(i - 1, j, "top");
        }
    }
}

beam(0, 0, "right");

console.log(matrix.map((row) => row.join("")).join("\n"));
console.log(Object.keys(cache).length);
