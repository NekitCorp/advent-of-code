const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const grid = input.split("\n").map((line) => line.split(""));

function findStartPosition() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "^") {
                return [i, j];
            }
        }
    }
    throw new Error("No start position found");
}

const DIRS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];
let positions = 0;
let [sx, sy] = findStartPosition();

function loop(x: number, y: number, dir: number, cache: Record<string, boolean>): boolean {
    if (cache[`${x},${y},${dir}`]) {
        return true;
    }

    cache[`${x},${y},${dir}`] = true;

    let [dx, dy] = DIRS[dir];
    x += dx;
    y += dy;

    if (x < 0 || x >= grid.length || y < 0 || y >= grid[x].length) {
        return false;
    }

    if (grid[x][y] === "#") {
        return loop(x - dx, y - dy, (dir + 1) % 4, cache);
    } else {
        return loop(x, y, dir, cache);
    }
}

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === ".") {
            grid[i][j] = "#";

            if (loop(sx, sy, 0, {})) {
                positions += 1;
            }

            grid[i][j] = ".";
        }
    }
}

console.log({ positions });
