const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const [gridStr, movesStr] = input.split("\n\n");
let grid = gridStr.split("\n").map((row) => row.split(""));
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

function resize(grid: string[][]): string[][] {
    const resizedGrid = new Array(grid.length);

    for (let y = 0; y < grid.length; y++) {
        resizedGrid[y] = [];

        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === "#") {
                resizedGrid[y].push("#", "#");
            } else if (grid[y][x] === ".") {
                resizedGrid[y].push(".", ".");
            } else if (grid[y][x] === "O") {
                resizedGrid[y].push("[", "]");
            } else if (grid[y][x] === "@") {
                resizedGrid[y].push("@", ".");
            }
        }
    }

    return resizedGrid;
}

const movesMap: Record<string, [number, number]> = {
    "^": [0, -1],
    v: [0, 1],
    "<": [-1, 0],
    ">": [1, 0],
};

function getBoxBounds(x: number, y: number): [number, number, number, number] {
    let lx, ly, rx, ry;

    if (grid[y][x] === "[") {
        lx = x;
        ly = y;
    } else {
        lx = x - 1;
        ly = y;
    }

    rx = lx + 1;
    ry = ly;

    return [lx, ly, rx, ry];
}

function shiftBox(
    check: boolean,
    lx: number,
    ly: number,
    rx: number,
    ry: number,
    dx: number,
    dy: number
): boolean {
    const queue: [x: number, y: number, boxPart: string][] = [
        [lx, ly, "["],
        [rx, ry, "]"],
    ];

    const seen = new Set<string>([`${lx},${ly}`, `${rx},${ry}`]);
    const placed = new Set();

    while (queue.length) {
        let [x, y, boxPart] = queue.shift()!;

        if (!check && !placed.has(`${x},${y}`)) {
            grid[y][x] = ".";
        }

        const nx = x + dx;
        const ny = y + dy;

        if (grid[ny][nx] === ".") {
            // skip
        } else if (grid[ny][nx] === "#") {
            return false;
        } else {
            let [lx, ly, rx, ry] = getBoxBounds(nx, ny);

            if (!seen.has(`${lx},${ly}`)) {
                seen.add(`${lx},${ly}`);
                seen.add(`${rx},${ry}`);
                queue.push([lx, ly, "["], [rx, ry, "]"]);
            }
        }

        if (!check) {
            placed.add(`${nx},${ny}`);
            grid[ny][nx] = boxPart;
        }
    }

    return true;
}

grid = resize(grid);
let [x, y] = getRobotPosition(grid);

for (const move of moves) {
    const [dx, dy] = movesMap[move];
    const nx = x + dx;
    const ny = y + dy;

    if (grid[ny][nx] === "#") {
        continue;
    } else if (grid[ny][nx] === ".") {
        grid[y][x] = ".";
        x = nx;
        y = ny;
        grid[y][x] = "@";
    } else if (grid[ny][nx] === "[" || grid[ny][nx] === "]") {
        const [lx, ly, rx, ry] = getBoxBounds(nx, ny);

        if (shiftBox(true, lx, ly, rx, ry, dx, dy)) {
            shiftBox(false, lx, ly, rx, ry, dx, dy);
            grid[y][x] = ".";
            x = nx;
            y = ny;
            grid[y][x] = "@";
        }
    }
}

console.log(grid.map((row) => row.join("")).join("\n"));

let sum = 0;

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === "[") {
            sum += 100 * y + x;
        }
    }
}

console.log({ sum });
