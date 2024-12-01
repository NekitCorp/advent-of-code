import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const garden = input.split("\n");
const m = garden.length;
const n = garden[0].length;
const goal = 26501365;

function run(): number[] {
    const result: number[] = [];

    const deser = (str: string): number[] => str.split(",").map((x) => +x);
    const mod = (a: number, b: number): number => ((a % b) + b) % b;
    const gd = (y: number, x: number): string => garden[mod(y, m)][mod(x, m)];

    let locs: Record<string, boolean> = {};

    for (let y = 0; y < m; y++) {
        for (let x = 0; x < n; x++) {
            if (garden[y][x] == "S") {
                locs[y + "," + x] = true;
            }
        }
    }

    for (let i = 1; i <= 131 * 3 + 65; i++) {
        let nlocs: Record<string, boolean> = {};

        for (let l in locs) {
            let [y, x] = deser(l);

            if (gd(y - 1, x) !== "#") nlocs[y - 1 + "," + x] = true;
            if (gd(y + 1, x) !== "#") nlocs[y + 1 + "," + x] = true;
            if (gd(y, x - 1) !== "#") nlocs[y + "," + (x - 1)] = true;
            if (gd(y, x + 1) !== "#") nlocs[y + "," + (x + 1)] = true;
        }

        if (i % 131 === 65) {
            let cnt = 0;
            for (let l in nlocs) cnt++;
            result.push(cnt);

            console.log(`a${result.length - 1} = ${cnt}`);

            if (result.length === 3) {
                return result;
            }
        }

        locs = nlocs;
    }

    return [];
}

function f(v: number, [a0, a1, a2]: [a0: number, a1: number, a2: number]): number {
    const b0 = a0;
    const b1 = a1 - a0;
    const b2 = a2 - a1;

    return b0 + b1 * v + Math.floor((v * (v - 1)) / 2) * (b2 - b1);
}

const [a0, a1, a2] = run();
const steps = f(Math.floor(goal / n), [a0, a1, a2]);

console.log({ steps });
