const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const grid = input.split("\n").map((line) => line.split(""));

const DIRS: [number, number][] = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
];

let totalCount = 0;

function step(): number {
    let count = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i]!.length; j++) {
            if (grid[i]![j] === "@") {
                let adjacent = 0;

                for (const [dx, dy] of DIRS) {
                    const nx = i + dx;
                    const ny = j + dy;

                    if (grid[nx]?.[ny] === "@") {
                        adjacent += 1;
                    }
                }

                if (adjacent < 4) {
                    count += 1;
                    grid[i]![j] = ".";
                }
            }
        }
    }

    totalCount += count;

    return count;
}

while (step() !== 0);

console.log({ count: totalCount });
