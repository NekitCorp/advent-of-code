const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

function parseMachine(machine: string) {
    const [a, b, prize] = machine.split("\n");
    const [ax, ay] = a.split("X+")[1].split(", Y+");
    const [bx, by] = b.split("X+")[1].split(", Y+");
    const [px, py] = prize.split("X=")[1].split(", Y=");

    return {
        a: [Number(ax), Number(ay)],
        b: [Number(bx), Number(by)],
        prize: [Number(px), Number(py)],
    };
}

function findCheapestPath(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
    // { ax * a + bx * b = px }
    // { ay * a + by * b = py }
    // ====================
    // a = (px - bx * b) / ax
    // a = (py - by * b) / ay
    //
    // (px - bx * b) / ax = (py - by * b) / ay
    // (px - bx * b) * ay = (py - by * b) * ax
    // px * ay - bx * b * ay = py * ax - by * b * ax
    // px * ay - py * ax = bx * b * ay - by * b * ax
    // px * ay - py * ax = b * (bx * ay - by * ax)
    // b = (px * ay - py * ax) / (bx * ay - by * ax)
    // ====================
    // b = (px - ax * a) / bx
    // b = (py - ay * a) / by
    //
    // (px - ax * a) / bx = (py - ay * a) / by
    // (px - ax * a) * by = (py - ay * a) * bx
    // px * by - ax * a * by = py * bx - ay * a * bx
    // px * by - py * bx = a * (ax * by - ay * bx)
    // a = (px * by - py * bx) / (ax * by - ay * bx)
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
