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

const DIRS = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
];

type NodeItem = {
    i: number;
    j: number;
    dir: number;
    score: number;
};

function minPath(): number {
    const visited = new Set<string>();
    const pq = new Heap<NodeItem>((a, b) => a.score - b.score);

    pq.push({ i: s[0], j: s[1], dir: 0, score: 0 });

    while (pq.length > 0) {
        const { dir, i, j, score } = pq.pop()!;

        if (visited.has(`${i},${j},${dir}`)) {
            continue;
        }

        visited.add(`${i},${j},${dir}`);

        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === "#") {
            continue;
        }

        if (i === e[0] && j === e[1]) {
            return score;
        }

        const prevDir = (dir + 1) % 4;
        const nextDir = dir === 0 ? 3 : dir - 1;

        pq.push(
            { i: i + DIRS[dir][0], j: j + DIRS[dir][1], score: score + 1, dir },
            { i: i + DIRS[prevDir][0], j: j + DIRS[prevDir][1], score: score + 1001, dir: prevDir },
            { i: i + DIRS[nextDir][0], j: j + DIRS[nextDir][1], score: score + 1001, dir: nextDir }
        );
    }

    throw new Error("No path found");
}

console.log({
    e,
    s,
    score: minPath(),
});
