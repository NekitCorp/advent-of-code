import Heap from "heap-js";

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const grid = input.split("\n").map((row) => row.split(""));

let s: [number, number] = [-1, -1];
let e: [number, number] = [-1, -1];

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] === "S") s = [i, j];
        if (grid[i][j] === "E") e = [i, j];
    }
}

const DIRS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

function bfs(grid: string[][], start: [number, number]): Record<string, number> {
    const distances: { [key: string]: number } = { [`${start[1]},${start[0]}`]: 0 };
    const queue: { x: number; y: number; steps: number }[] = [
        { x: start[1], y: start[0], steps: 0 },
    ];

    while (queue.length !== 0) {
        const { steps, x, y } = queue.shift()!;

        for (const [dx, dy] of DIRS) {
            const nx = x + dx;
            const ny = y + dy;

            if (
                nx < 0 ||
                nx >= grid[0].length ||
                ny < 0 ||
                ny >= grid.length ||
                grid[ny][nx] === "#"
            ) {
                continue;
            }

            if (distances[`${nx},${ny}`] === undefined || distances[`${nx},${ny}`] > steps + 1) {
                distances[`${nx},${ny}`] = steps + 1;
                queue.push({ x: nx, y: ny, steps: steps + 1 });
            }
        }
    }

    return distances;
}

const distances = bfs(grid, e);
const walkable = Object.keys(distances);
let cheats = 0;

for (let i = 0; i < walkable.length; i++) {
    for (let j = 0; j < walkable.length; j++) {
        if (i === j) continue;

        const start = walkable[i].split(",").map((num) => parseInt(num));
        const end = walkable[j].split(",").map((num) => parseInt(num));

        const dist = Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);

        if (dist <= 20 && distances[walkable[i]] - distances[walkable[j]] - dist >= 100) {
            cheats += 1;
        }
    }
}

console.log({
    e,
    s,
    cheats,
});
