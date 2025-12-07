const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const grid = input.split("\n").map((line) => line.trim().split(""));

const n = grid.length;
const m = grid[0]!.length;
const window: number[] = new Array(m).fill(0);

const s = grid[0]!.findIndex((cell) => cell === "S");
window[s] = 1;

for (let i = 1; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (grid[i]![j] === "^" && window[j] !== 0) {
            if (j - 1 >= 0) {
                window[j - 1]! += window[j]!;
            }

            if (j + 1 < m) {
                window[j + 1]! += window[j]!;
            }

            window[j] = 0;
        }
    }
}

console.log({ count: window.reduce((a, b) => a + b, 0) });
