const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

function parseRobot(line: string) {
    const [ps, vs] = line.split(" ");
    const p = ps.slice(2).split(",").map(Number);
    const v = vs.slice(2).split(",").map(Number);

    return {
        x: p[0],
        y: p[1],
        dx: v[0],
        dy: v[1],
    };
}

const robots = input.split("\n").map(parseRobot);
const X = 101;
const Y = 103;
const SECONDS = 100;

for (let i = 0; i < SECONDS; i++) {
    for (const robot of robots) {
        robot.x = (robot.x + robot.dx + X) % X;
        robot.y = (robot.y + robot.dy + Y) % Y;
    }
}

let q1 = 0,
    q2 = 0,
    q3 = 0,
    q4 = 0;

const grid = new Array(Y).fill(0).map(() => new Array(X).fill(0));

for (const { x, y } of robots) {
    if (x < Math.floor(X / 2) && y < Math.floor(Y / 2)) {
        q1 += 1;
    } else if (x > Math.floor(X / 2) && y < Math.floor(Y / 2)) {
        q2 += 1;
    } else if (x < Math.floor(X / 2) && y > Math.floor(Y / 2)) {
        q3 += 1;
    } else if (x > Math.floor(X / 2) && y > Math.floor(Y / 2)) {
        q4 += 1;
    }

    grid[y][x] += 1;
}

console.log(grid.map((row) => row.map((i) => (i === 0 ? "." : i)).join("")).join("\n"));
console.log({ q1, q2, q3, q4, result: q1 * q2 * q3 * q4 });
