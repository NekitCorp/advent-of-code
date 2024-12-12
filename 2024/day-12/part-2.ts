const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const grid = input.split("\n").map((row) => row.split(""));
const DIRS = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // bottom
    [0, -1], // left
];

type Wall = [x: number, y: number, dir: number];

const isVerticalWall = (wall: Wall): boolean => wall[2] === 0 || wall[2] === 2;

const visited = new Set<string>();
let price = 0;

for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
        if (!visited.has(`${x},${y}`)) {
            const [walls, perimeter] = dfs(x, y, grid[x][y]);
            price += filterWalls(walls) * perimeter;
        }
    }
}

function filterWalls(walls: Wall[]): number {
    let sides = 1;

    walls.sort((a, b) => {
        if (a[2] === b[2]) {
            if (isVerticalWall(a)) {
                return a[0] - b[0] || a[1] - b[1];
            } else {
                return a[1] - b[1] || a[0] - b[0];
            }
        }

        return a[2] - b[2];
    });

    for (let i = 1; i < walls.length; i++) {
        if (walls[i][2] !== walls[i - 1][2]) {
            sides++;
        } else if (isVerticalWall(walls[i])) {
            if (walls[i][1] !== walls[i - 1][1] + 1 || walls[i][0] !== walls[i - 1][0]) {
                sides++;
            }
        } else {
            if (walls[i][0] !== walls[i - 1][0] + 1 || walls[i][1] !== walls[i - 1][1]) {
                sides++;
            }
        }
    }

    return sides;
}

function dfs(x: number, y: number, region: string): [walls: Wall[], perimeter: number] {
    if (
        x < 0 ||
        y < 0 ||
        x >= grid.length ||
        y >= grid[x].length ||
        grid[x][y] !== region ||
        visited.has(`${x},${y}`)
    ) {
        return [[], 0];
    }

    visited.add(`${x},${y}`);

    let walls: Wall[] = [],
        perimeter = 0;

    for (let i = 0; i < DIRS.length; i++) {
        const [dx, dy] = DIRS[i];
        const nx = x + dx;
        const ny = y + dy;

        if (grid[nx]?.[ny] !== region) {
            walls.push([x, y, i]);
        }

        const [w, p] = dfs(nx, ny, region);
        walls.push(...w);
        perimeter += p;
    }

    return [walls, perimeter + 1];
}

console.log({ price });
