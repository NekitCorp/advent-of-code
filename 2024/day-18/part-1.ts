import Heap from "heap-js";

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const bytes = input.split("\n").map((line) => line.split(",").map(Number));

function createGrid(x: number, y: number, bytes: number[][], bytesCount: number): string[][] {
    const grid = Array.from({ length: y + 1 }, () => Array.from({ length: x + 1 }, () => "."));

    for (let i = 0; i < bytesCount; i++) {
        grid[bytes[i][1]][bytes[i][0]] = "#";
    }

    return grid;
}

function minPath(grid: string[][]): number {
    const visited = new Set<string>();
    const pq = new Heap<{ x: number; y: number; steps: number }>((a, b) => a.steps - b.steps);

    pq.push({ x: 0, y: 0, steps: 0 });

    while (pq.length > 0) {
        const { x, y, steps } = pq.pop()!;

        if (visited.has(`${x},${y}`)) {
            continue;
        }

        visited.add(`${x},${y}`);

        if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length || grid[y][x] === "#") {
            continue;
        }

        if (x === grid[0].length - 1 && y === grid.length - 1) {
            return steps;
        }

        pq.push(
            { x: x + 1, y, steps: steps + 1 },
            { x: x - 1, y, steps: steps + 1 },
            { x, y: y + 1, steps: steps + 1 },
            { x, y: y - 1, steps: steps + 1 }
        );
    }

    throw new Error("No path found");
}

const grid = createGrid(70, 70, bytes, 1024);
const steps = minPath(grid);

console.log(grid.map((row) => row.join("")).join("\n"));
console.log({ steps });
