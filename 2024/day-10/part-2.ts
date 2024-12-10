const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const grid = input.split("\n").map((row) => row.split("").map(Number));

let scores = 0;

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === 0) {
            scores += dfs(i, j, 0);
        }
    }
}

function dfs(i: number, j: number, next: number): number {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] !== next) {
        return 0;
    }

    if (grid[i][j] === 9) {
        return 1;
    }

    return dfs(i + 1, j, next + 1) + dfs(i - 1, j, next + 1) + dfs(i, j + 1, next + 1) + dfs(i, j - 1, next + 1);
}

console.log({ scores });
