import Heap from "heap-js";

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const grid = input.split("\n").map((row) => row.split(""));

let s = [-1, -1];
let e = [-1, -1];

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] === "S") s = [i, j];
        if (grid[i][j] === "E") e = [i, j];
    }
}

function minPath(grid: string[][]): number {
    const pq = new Heap<{ i: number; j: number; seconds: number }>((a, b) => a.seconds - b.seconds);
    const visited: Record<string, number> = {};

    pq.push({ i: s[0], j: s[1], seconds: 0 });

    while (pq.length > 0) {
        const { i, j, seconds } = pq.pop()!;

        if (visited[`${i},${j}`]) {
            continue;
        }

        visited[`${i},${j}`] = seconds;

        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === "#") {
            continue;
        }

        if (i === e[0] && j === e[1]) {
            return seconds;
        }

        pq.push(
            { i: i + 1, j, seconds: seconds + 1 },
            { i: i - 1, j, seconds: seconds + 1 },
            { i, j: j + 1, seconds: seconds + 1 },
            { i, j: j - 1, seconds: seconds + 1 }
        );
    }

    throw new Error("No path found");
}

const min = minPath(grid);
let cheats = 0;

for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid.length - 1; j++) {
        if (grid[i][j] === "#") {
            grid[i][j] = ".";
            const newMin = minPath(grid);
            if (min - newMin >= 100) {
                cheats += 1;
            }
            grid[i][j] = "#";
        }
    }
}

console.log({
    e,
    s,
    min,
    cheats,
});
