const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const X = 101;
const Y = 103;

type Robot = {
    x: number;
    y: number;
    dx: number;
    dy: number;
};

function parseRobot(line: string): Robot {
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

function robotsHash(robots: Robot[]): string {
    return robots.map((robot) => `${robot.x},${robot.y}`).join(",");
}

function findCycle(robots: Robot[]): number {
    const set = new Set<string>();

    set.add(robotsHash(robots));

    for (let i = 0; i < 100_000_000; i++) {
        for (const robot of robots) {
            robot.x = (robot.x + robot.dx + X) % X;
            robot.y = (robot.y + robot.dy + Y) % Y;
        }

        if (set.has(robotsHash(robots))) {
            return i + 1;
        }

        set.add(robotsHash(robots));
    }

    return -1;
}

const cycle = findCycle(input.split("\n").map(parseRobot));
const robots = input.split("\n").map(parseRobot);
const grid = new Array(Y).fill(0).map(() => new Array(X).fill(0));
const writer = Bun.file(`${import.meta.dir}/output.txt`).writer();

for (const robot of robots) {
    grid[robot.y][robot.x] += 1;
}

for (let i = 0; i < cycle; i++) {
    for (const robot of robots) {
        grid[robot.y][robot.x] -= 1;
        robot.x = (robot.x + robot.dx + X) % X;
        robot.y = (robot.y + robot.dy + Y) % Y;
        grid[robot.y][robot.x] += 1;
    }

    writer.write(`Second: ${i + 1}\n`);
    writer.write(grid.map((row) => row.map((i) => (i === 0 ? "." : i)).join("")).join("\n") + "\n\n");
    writer.flush();
}

writer.end();

console.log(`Cycle: ${cycle}`);
