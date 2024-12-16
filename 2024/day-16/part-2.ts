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

let minScore = Infinity;
let set = new Set<string>();

function dfs(
    i: number,
    j: number,
    score: number,
    cache: Record<string, number>,
    dir: number,
    path: [number, number][]
): number {
    if (i === e[0] && j === e[1]) {
        if (score < minScore) {
            minScore = score;
            set = new Set<string>();

            for (const [i, j] of path) {
                set.add(`${i},${j}`);
            }
        } else if (score === minScore) {
            for (const [i, j] of path) {
                set.add(`${i},${j}`);
            }
        } else {
            return Infinity;
        }
    }

    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === "#") {
        return Infinity;
    }

    if (score >= minScore) {
        return Infinity;
    }

    if (cache[`${i},${j},${dir}`] && cache[`${i},${j},${dir}`] < score) {
        return Infinity;
    }
    cache[`${i},${j},${dir}`] = score;

    const prevDir = (dir + 1) % 4;
    const nextDir = dir === 0 ? 3 : dir - 1;

    return Math.min(
        dfs(i + DIRS[dir][0], j + DIRS[dir][1], score + 1, cache, dir, [...path, [i, j]]),
        dfs(i + DIRS[prevDir][0], j + DIRS[prevDir][1], score + 1001, cache, prevDir, [
            ...path,
            [i, j],
        ]),
        dfs(i + DIRS[nextDir][0], j + DIRS[nextDir][1], score + 1001, cache, nextDir, [
            ...path,
            [i, j],
        ])
    );
}

dfs(s[0], s[1], 0, {}, 0, []);

console.log({
    e,
    s,
    points: set.size + 1,
});
