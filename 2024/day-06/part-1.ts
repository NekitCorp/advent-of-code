const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const grid = input.split("\n").map((line) => line.split(""));

function findStartPosition() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "^") {
                grid[i][j] = "X";
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
let positions = 1;
let [x, y] = findStartPosition();

function move(x: number, y: number, dir: number) {
    let [dx, dy] = DIRS[dir];

    x += dx;
    y += dy;

    if (x < 0 || x >= grid.length || y < 0 || y >= grid[x].length) {
        return;
    }

    if (grid[x][y] === "#") {
        move(x - dx, y - dy, (dir + 1) % 4);
    } else if (grid[x][y] === ".") {
        grid[x][y] = "X";
        positions++;
        move(x, y, dir);
    } else if (grid[x][y] === "X") {
        move(x, y, dir);
    }
}

move(x, y, 0);

console.log(grid.map((line) => line.join("")).join("\n"));
console.log({ positions });
