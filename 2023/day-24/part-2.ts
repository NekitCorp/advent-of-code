import { RatNum, init } from "z3-solver";
import { readInput } from "../utils.js";

const hailstones = readInput(import.meta.url)
    .split("\n")
    .map((row) => {
        const [p, v] = row.split(" @ ");
        const [x, y, z] = p.split(", ").map(Number);
        const [xv, yv, zv] = v.split(", ").map(Number);

        return {
            position: { x, y, z },
            velocity: { x: xv, y: yv, z: zv },
        };
    });

async function solve(): Promise<number> {
    const { Context } = await init();
    const { Solver, Real } = Context("main");
    const solver = new Solver();

    const x = Real.const("x");
    const y = Real.const("y");
    const z = Real.const("z");
    const vx = Real.const("vx");
    const vy = Real.const("vy");
    const vz = Real.const("vz");

    for (let i = 0; i < 3; i++) {
        const { position, velocity } = hailstones[i];
        const tk = Real.const("tk" + i);
        solver.add(tk.mul(velocity.x).add(position.x).eq(tk.mul(vx).add(x)));
        solver.add(tk.mul(velocity.y).add(position.y).eq(tk.mul(vy).add(y)));
        solver.add(tk.mul(velocity.z).add(position.z).eq(tk.mul(vz).add(z)));
    }

    await solver.check();

    const value = (solver.model().eval(x.add(y).add(z)) as RatNum).value();
    const num = Number(value.numerator.toString().replace("n", ""));
    const denom = Number(value.denominator.toString().replace("n", ""));

    return num / denom;
}

const result = await solve();

console.log({ result });

process.exit(1);
