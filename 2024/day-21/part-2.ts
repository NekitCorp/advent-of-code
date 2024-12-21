import Heap from "heap-js";

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const codes = input.split("\n");

function minPaths(grid: string[][], s: [number, number], e: [number, number]): string[] {
    if (s[0] === e[0] && s[1] === e[1]) {
        return ["A"];
    }

    const visited: Record<string, number> = {};
    const pq = new Heap<{ i: number; j: number; steps: number; path: string[] }>(
        (a, b) => a.steps - b.steps
    );

    let paths = new Set<string>();
    let minSteps = Infinity;

    pq.push({ i: s[0], j: s[1], steps: 0, path: [] });

    while (pq.length > 0) {
        const { i, j, steps, path } = pq.pop()!;

        if (steps > minSteps) {
            continue;
        }

        if (visited[`${i},${j}`] && visited[`${i},${j}`] < steps) {
            continue;
        }

        visited[`${i},${j}`] = steps;

        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === "#") {
            continue;
        }

        if (i === e[0] && j === e[1]) {
            if (steps < minSteps) {
                minSteps = steps;
                paths = new Set<string>([path.join("") + "A"]);
            }

            if (steps === minSteps) {
                paths.add(path.join("") + "A");
            }
        }

        pq.push(
            { i: i + 1, j, steps: steps + 1, path: [...path, "v"] },
            { i: i - 1, j, steps: steps + 1, path: [...path, "^"] },
            { i, j: j + 1, steps: steps + 1, path: [...path, ">"] },
            { i, j: j - 1, steps: steps + 1, path: [...path, "<"] }
        );
    }

    return [...paths];
}

type Keypad = Record<string, [number, number]>;

// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
//     | 0 | A |
//     +---+---+
const numericKeypad: Keypad = {
    7: [0, 0],
    8: [0, 1],
    9: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    1: [2, 0],
    2: [2, 1],
    3: [2, 2],
    0: [3, 1],
    A: [3, 2],
};
const numericKeypadGrid = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["#", "0", "A"],
];

//     +---+---+
//     | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+
const directionalKeypad: Keypad = {
    "^": [0, 1],
    A: [0, 2],
    "<": [1, 0],
    v: [1, 1],
    ">": [1, 2],
};
const directionalKeypadGrid = [
    ["#", "^", "A"],
    ["<", "v", ">"],
];

function dfs(
    grid: string[][],
    keypad: Keypad,
    code: string,
    robot: number,
    memo: Record<string, number>
): number {
    const key = `${code},${robot}`;

    if (memo[key] !== undefined) {
        return memo[key];
    }

    let current = "A";
    let length = 0;

    for (let i = 0; i < code.length; i++) {
        const moves = minPaths(grid, keypad[current], keypad[code[i]]);

        if (robot === 0) {
            length += moves[0].length;
        } else {
            length += Math.min(
                ...moves.map((move) =>
                    dfs(directionalKeypadGrid, directionalKeypad, move, robot - 1, memo)
                )
            );
        }

        current = code[i];
    }

    return (memo[key] = length);
}

let sum = 0;
const memo: Record<string, number> = {};

for (const code of codes) {
    sum += parseInt(code) * dfs(numericKeypadGrid, numericKeypad, code, 25, memo);
}

console.log({ sum });
