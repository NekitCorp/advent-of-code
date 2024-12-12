const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const grid = input.split("\n").map((row) => row.split(""));
const DIRS = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

const visited = new Set<string>();
let price = 0;

for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
        if (!visited.has(`${x},${y}`)) {
            const [fence, perimeter] = dfs(x, y, grid[x][y]);
            price += fence * perimeter;
        }
    }
}

function dfs(x: number, y: number, region: string): [fence: number, perimeter: number] {
    if (
        x < 0 ||
        y < 0 ||
        x >= grid.length ||
        y >= grid[x].length ||
        grid[x][y] !== region ||
        visited.has(`${x},${y}`)
    ) {
        return [0, 0];
    }

    visited.add(`${x},${y}`);

    let fence = 0,
        perimeter = 0,
        sides = 0;

    for (const [dx, dy] of DIRS) {
        const nx = x + dx;
        const ny = y + dy;

        if (grid[nx]?.[ny] === region) {
            sides += 1;
        }

        const [f, p] = dfs(nx, ny, region);
        fence += f;
        perimeter += p;
    }

    return [fence + (4 - sides), perimeter + 1];
}

console.log({ price });
