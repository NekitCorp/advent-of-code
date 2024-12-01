import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const map = input.split("\n").map((line) => line.split(""));

type StackItem = {
    i: number;
    j: number;
    steps: number;
    from: "top" | "right" | "bottom" | "left";
    set: Record<string, boolean>;
};

const cache: Record<string, number> = {};

function dfs(): number {
    const stack: StackItem[] = [{ i: 0, j: 1, steps: 0, from: "top", set: {} }];
    let max = 0;

    while (stack.length > 0) {
        const { from, i, j, steps, set } = stack.pop()!;
        const key = `${i}-${j}`;

        if (i < 0 || i > map.length - 1 || j < 0 || j > map[0].length - 1) {
            continue;
        }

        if (set[key]) {
            continue;
        }

        if (cache[key] >= steps) {
            continue;
        }

        if (map[i][j] === "#") {
            continue;
        }

        if (
            (map[i][j] === "^" && from === "top") ||
            (map[i][j] === ">" && from === "left") ||
            (map[i][j] === "v" && from === "bottom") ||
            (map[i][j] === "<" && from === "left")
        ) {
            continue;
        }

        if (i === map.length - 1 && j === map[0].length - 2) {
            max = Math.max(max, steps + 1);
        }

        cache[key] = steps;

        stack.push({
            i: i - 1, // top
            j: j,
            steps: steps + 1,
            from: "bottom",
            set: { ...set, [key]: true },
        });
        stack.push({
            i: i,
            j: j + 1, //right
            steps: steps + 1,
            from: "right",
            set: { ...set, [key]: true },
        });
        stack.push({
            i: i + 1, // bottom
            j: j,
            steps: steps + 1,
            from: "top",
            set: { ...set, [key]: true },
        });
        stack.push({
            i: i,
            j: j - 1, // left
            steps: steps + 1,
            from: "left",
            set: { ...set, [key]: true },
        });
    }

    return max - 1;
}

const steps = dfs();

console.log({ steps });
