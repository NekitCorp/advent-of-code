const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

function parse(input: string) {
    const schematics = input.split("\n\n");
    const locks: number[][] = [];
    const keys: number[][] = [];
    let m = 0;

    for (const schema of schematics) {
        const grid = schema.split("\n").map((row) => row.split(""));
        const height: number[] = new Array(grid[0].length).fill(0);

        for (let i = 1; i < grid.length - 1; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] === "#") {
                    height[j] += 1;
                }
            }
        }

        if (grid[0][0] === ".") {
            keys.push(height);
        } else {
            locks.push(height);
        }

        m = grid.length - 2;
    }

    return { locks, keys, m };
}

const { locks, keys, m } = parse(input);
let count = 0;

for (const key of keys) {
    for (const lock of locks) {
        if (key.every((k, i) => k + lock[i] <= m)) {
            count += 1;
        }
    }
}

console.log({ count });
