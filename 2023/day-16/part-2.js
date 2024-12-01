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

/**
 * @param {number} i
 * @param {number} j
 * @param {Direction} dir
 * @param {Record<string, (Direction)[]>} cache
 */
function beam(i, j, dir, cache) {
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
        beam(iNext, jNext, dir, cache);
    } else if (matrix[i][j] === "-") {
        if (["left", "right"].includes(dir)) {
            beam(iNext, jNext, dir, cache);
        } else {
            beam(i, j - 1, "left", cache);
            beam(i, j + 1, "right", cache);
        }
    } else if (matrix[i][j] === "|") {
        if (["top", "bottom"].includes(dir)) {
            beam(iNext, jNext, dir, cache);
        } else {
            beam(i - 1, j, "top", cache);
            beam(i + 1, j, "bottom", cache);
        }
    } else if (matrix[i][j] === "/") {
        switch (dir) {
            case "top":
                return beam(i, j + 1, "right", cache);
            case "right":
                return beam(i - 1, j, "top", cache);
            case "bottom":
                return beam(i, j - 1, "left", cache);
            case "left":
                return beam(i + 1, j, "bottom", cache);
        }
    } else if (matrix[i][j] === "\\") {
        switch (dir) {
            case "top":
                return beam(i, j - 1, "left", cache);
            case "right":
                return beam(i + 1, j, "bottom", cache);
            case "bottom":
                return beam(i, j + 1, "right", cache);
            case "left":
                return beam(i - 1, j, "top", cache);
        }
    }
}

/**
 * @returns {number}
 */
function findMax() {
    let max = 0;
    /** @type {Record<string, (Direction)[]>} */
    let cache = {};

    for (let i = 0; i < matrix.length; i++) {
        cache = {};

        beam(i, 0, "right", cache);
        max = Math.max(max, Object.keys(cache).length);

        cache = {};

        beam(i, matrix[0].length - 1, "left", cache);
        max = Math.max(max, Object.keys(cache).length);
    }

    for (let j = 0; j < matrix.length; j++) {
        cache = {};

        beam(0, j, "bottom", cache);
        max = Math.max(max, Object.keys(cache).length);

        cache = {};

        beam(matrix.length - 1, j, "top", cache);
        max = Math.max(max, Object.keys(cache).length);
    }

    return max;
}

console.log({ max: findMax() });
