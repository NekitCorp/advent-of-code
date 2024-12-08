const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const grid = input.split("\n").map((row) => row.split(""));

const antennas: Record<string, [number, number][]> = {};

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] !== ".") {
            if (!antennas[grid[i][j]]) antennas[grid[i][j]] = [];
            antennas[grid[i][j]].push([i, j]);
        }
    }
}

let antinodes = 0;

for (const key in antennas) {
    if (antennas[key].length < 2) continue;

    for (let i = 0; i < antennas[key].length; i++) {
        for (let j = i + 1; j < antennas[key].length; j++) {
            const [x1, y1] = antennas[key][i];
            const [x2, y2] = antennas[key][j];
            const [ax1, ay1] = [x1 * 2 - x2, y1 * 2 - y2];
            const [ax2, ay2] = [x2 * 2 - x1, y2 * 2 - y1];

            if (ax1 >= 0 && ax1 < grid.length && ay1 >= 0 && ay1 < grid[0].length && grid[ax1][ay1] !== "#") {
                grid[ax1][ay1] = "#";
                antinodes += 1;
            }

            if (ax2 >= 0 && ax2 < grid.length && ay2 >= 0 && ay2 < grid[0].length && grid[ax2][ay2] !== "#") {
                grid[ax2][ay2] = "#";
                antinodes += 1;
            }
        }
    }
}

console.log(grid.map((row) => row.join("")).join("\n"));
console.log({ antinodes });
