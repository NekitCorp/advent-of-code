// @ts-check

import { readInput } from "../utils.js";
import { MinHeap } from "./heap/min-heap.js";

const input = readInput(import.meta.url);
const matrix = input.split("\n").map((row) => row.split(""));
const DIRS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

/**
 * @param {number} minDist
 * @param {number} maxDist
 * @returns {number}
 */
function run(minDist, maxDist) {
    const queue = new MinHeap((a, b) => a[0] - b[0]);
    const seen = new Set();
    const costs = {};

    queue.add([0, 0, 0, -1]);

    while (!queue.isEmpty()) {
        const [cost, x, y, dd] = queue.poll();

        if (x === matrix.length - 1 && y === matrix[0].length - 1) {
            return cost;
        }

        const seenKey = x + "-" + y + "-" + dd;
        if (seen.has(seenKey)) {
            continue;
        } else {
            seen.add(seenKey);
        }

        for (let direction = 0; direction < 4; direction++) {
            let costIncrease = 0;

            if (direction === dd || (direction + 2) % 4 === dd) {
                continue;
            }

            for (let distance = 1; distance < maxDist + 1; distance++) {
                const xx = x + DIRS[direction][0] * distance;
                const yy = y + DIRS[direction][1] * distance;

                if (xx >= 0 && xx < matrix.length && yy >= 0 && yy < matrix[0].length) {
                    costIncrease += Number(matrix[xx][yy]);
                    if (distance < minDist) {
                        continue;
                    }
                    const nc = cost + costIncrease;
                    if ((costs[xx + "-" + yy + "-" + direction] ?? 1e100) <= nc) {
                        continue;
                    }
                    costs[xx + "-" + yy + "-" + direction] = nc;
                    queue.add([nc, xx, yy, direction]);
                }
            }
        }
    }

    return -1;
}

console.log(run(1, 3));
