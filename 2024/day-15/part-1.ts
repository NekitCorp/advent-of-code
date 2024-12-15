const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const [gridStr, movesStr] = input.split("\n\n");
const grid = gridStr.split("\n").map((row) => row.split(""));
const moves = movesStr
    .split("\n")
    .map((move) => move.split(""))
    .flat(1);

function getRobotPosition(grid: string[][]): [x: number, y: number] {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === "@") {
                return [x, y];
            }
        }
    }
    throw new Error("Robot not found");
}

const movesMap: Record<string, [number, number]> = {
    "^": [0, -1],
    v: [0, 1],
    "<": [-1, 0],
    ">": [1, 0],
};
let [x, y] = getRobotPosition(grid);

grid[y][x] = ".";

for (const move of moves) {
    const [dx, dy] = movesMap[move];
    let nx = x + dx;
    let ny = y + dy;

    if (grid[ny][nx] === "#") {
        continue;
    } else if (grid[ny][nx] === ".") {
        x = nx;
        y = ny;
    } else if (grid[ny][nx] === "O") {
        while (grid[ny][nx] === "O") {
            nx += dx;
            ny += dy;
        }

        if (grid[ny][nx] === "#") {
            continue;
        } else if (grid[ny][nx] === ".") {
            while (nx !== x || ny !== y) {
                [grid[ny][nx], grid[ny - dy][nx - dx]] = [grid[ny - dy][nx - dx], grid[ny][nx]];
                nx -= dx;
                ny -= dy;
            }
            x = x + dx;
            y = y + dy;
        }
    }
}

grid[y][x] = "@";
console.log(grid.map((row) => row.join("")).join("\n"));

let sum = 0;

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === "O") {
            sum += 100 * y + x;
        }
    }
}

console.log({ sum });
