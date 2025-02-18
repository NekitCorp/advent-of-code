const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

function parseMachine(machine: string) {
    const [a, b, prize] = machine.split("\n");
    const [ax, ay] = a.split("X+")[1].split(", Y+");
    const [bx, by] = b.split("X+")[1].split(", Y+");
    const [px, py] = prize.split("X=")[1].split(", Y=");

    return {
        a: [Number(ax), Number(ay)],
        b: [Number(bx), Number(by)],
        prize: [Number(px) + 10000000000000, Number(py) + 10000000000000],
    };
}

function findCheapestPath(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
    const a = (px * by - py * bx) / (ax * by - ay * bx);
    const b = (px * ay - py * ax) / (bx * ay - by * ax);

    // is integer
    if (a % 1 === 0 && b % 1 === 0) {
        return a * 3 + b * 1;
    }

    return 0;
}

console.log(
    input
        .split("\n\n")
        .map(parseMachine)
        .reduce((acc, { a, b, prize }) => acc + findCheapestPath(prize[0], prize[1], a[0], a[1], b[0], b[1]), 0)
);
