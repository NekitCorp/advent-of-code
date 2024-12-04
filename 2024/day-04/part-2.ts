const input = await Bun.file(`${import.meta.dir}/input.txt`).text(),
    grid = input.split("\n"),
    m = grid.length,
    n = grid[0].length;

let count = 0;

for (let x = 0; x < m; x++) {
    for (let y = 0; y < n; y++) {
        if (
            grid[x][y] === "A" &&
            ((grid[x - 1]?.[y - 1] === "M" && grid[x + 1]?.[y + 1] === "S") ||
                (grid[x - 1]?.[y - 1] === "S" && grid[x + 1]?.[y + 1] === "M")) &&
            ((grid[x - 1]?.[y + 1] === "M" && grid[x + 1]?.[y - 1] === "S") ||
                (grid[x - 1]?.[y + 1] === "S" && grid[x + 1]?.[y - 1] === "M"))
        ) {
            count += 1;
        }
    }
}

console.log({ count });
