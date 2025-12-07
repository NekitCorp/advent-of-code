const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const grid = input.split("\n").map((line) => line.trim().split(""));

const n = grid.length;
const m = grid[0]!.length;
const window = grid[0]!;

let count = 0;

for (let i = 1; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (grid[i]![j] === "^" && window[j] === "S") {
            if (j - 1 >= 0) window[j - 1] = "S";
            if (j + 1 < m) window[j + 1] = "S";
            window[j] = ".";
            count += 1;
        }
    }
}

console.log({ count });
