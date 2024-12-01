import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const hailstones = input.split("\n").map((row) => {
    const [p, v] = row.split(" @ ");
    const [x, y, z] = p.split(", ").map(Number);
    const [xv, yv, zv] = v.split(", ").map(Number);

    return {
        position: { x, y, z },
        velocity: { x: xv, y: yv, z: zv },
    };
});
const MIN = 200_000_000_000_000;
const MAX = 400_000_000_000_000;

let count = 0;

for (let i = 0; i < hailstones.length; i++) {
    const { position: p1, velocity: v1 } = hailstones[i];

    for (const { position: p2, velocity: v2 } of hailstones.slice(i + 1)) {
        const a = v1.y / v1.x;

        const denom = a * v2.x - v2.y;
        if (denom === 0) {
            continue;
        }

        const t2 = (p2.y - p1.y + a * p1.x - a * p2.x) / denom;
        if (t2 < 0) {
            continue;
        }

        const t1 = (p2.x + v2.x * t2 - p1.x) / v1.x;
        if (t1 < 0) {
            continue;
        }

        const xp = p1.x + v1.x * t1;
        const yp = p1.y + v1.y * t1;

        if (MIN <= xp && xp <= MAX && MIN <= yp && yp <= MAX) {
            count += 1;
        }
    }
}

console.log({ count });
