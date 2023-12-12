// @ts-check

import { memoize, readInput } from "../utils.mjs";

const input = readInput(import.meta.url);
const lines = input.split("\n");

/**
 * @param {string} points
 * @param {number[]} groups
 * @returns {number}
 */
const dfs = memoize((points, groups) => {
    if (points.length === 0) {
        return groups.length === 0 ? 1 : 0;
    }

    if (points.startsWith(".")) {
        return dfs(points.slice(1), groups);
    }

    if (points.startsWith("?")) {
        return dfs(points.replace("?", "."), groups) + dfs(points.replace("?", "#"), groups);
    }

    if (points.startsWith("#")) {
        if (groups.length === 0) {
            return 0;
        }

        if (points.length < groups[0]) {
            return 0;
        }

        if (
            points
                .slice(0, groups[0])
                .split("")
                .some((c) => c === ".")
        ) {
            return 0;
        }

        if (groups.length === 1) {
            return dfs(points.slice(groups[0]), []);
        }

        if (groups.length > 1) {
            if (points.length < groups[0] + 1 || points[groups[0]] === "#") {
                return 0;
            }

            return dfs(points.slice(groups[0] + 1), groups.slice(1));
        }

        throw new Error("Unrecognized state starts with #");
    }

    throw new Error(`Unrecognized symbol: ${points[0]}`);
});

let sum = 0;

for (const line of lines) {
    const [points, groupsStr] = line.split(" ");
    const groups = groupsStr.split(",").map(Number);

    const pointsX5 = `${points}?${points}?${points}?${points}?${points}`;
    const groupsX5 = new Array(5).fill(groups).flat();

    sum += dfs(pointsX5, groupsX5);

    console.log({ line, sum });
}

console.log({ sum });
