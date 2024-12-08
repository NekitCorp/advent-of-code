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

            let [ax1, ay1] = [x1, y1];
            let [ax2, ay2] = [x2, y2];

            while (ax1 >= 0 && ax1 < grid.length && ay1 >= 0 && ay1 < grid[0].length) {
                if (grid[ax1][ay1] !== "#") {
                    grid[ax1][ay1] = "#";
                    antinodes += 1;
                }

                ax1 += x1 - x2;
                ay1 += y1 - y2;
            }

            while (ax2 >= 0 && ax2 < grid.length && ay2 >= 0 && ay2 < grid[0].length) {
                if (grid[ax2][ay2] !== "#") {
                    grid[ax2][ay2] = "#";
                    antinodes += 1;
                }

                ax2 += x2 - x1;
                ay2 += y2 - y1;
            }
        }
    }
}

console.log(grid.map((row) => row.join("")).join("\n"));
console.log({ antinodes });
