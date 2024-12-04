const input = await Bun.file(`${import.meta.dir}/input.txt`).text(),
    grid = input.split("\n"),
    m = grid.length,
    n = grid[0].length,
    dirs = [
        [0, 1], // right
        [0, -1], // left
        [1, 0], // down
        [-1, 0], // up
        [-1, -1], // up-left
        [1, 1], // down-right
        [-1, 1], // up-right
        [1, -1], // down-left
    ],
    word = ["X", "M", "A", "S"];

let count = 0;

for (let x = 0; x < m; x++) {
    for (let y = 0; y < n; y++) {
        for (const [dx, dy] of dirs) {
            for (let i = 0; i < word.length; i++) {
                const nx = x + i * dx;
                const ny = y + i * dy;

                if (nx < 0 || nx >= m || ny < 0 || ny >= n || grid[nx][ny] !== word[i]) {
                    break;
                }

                if (i === word.length - 1) {
                    count += 1;
                }
            }
        }
    }
}

console.log({ count });
