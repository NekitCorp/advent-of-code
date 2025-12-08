import Heap from "heap-js";

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

type Box = [x: number, y: number, z: number];

const boxes = input
    .split("\n")
    .map((line) => line.split(",").map(Number)) as Box[];

type Distance = { from: number; to: number; distance: number };

const distances = new Heap<Distance>((a, b) => a.distance - b.distance);

function distance3D(box1: Box, box2: Box): number {
    return (
        (box1[0] - box2[0]) ** 2 +
        (box1[1] - box2[1]) ** 2 +
        (box1[2] - box2[2]) ** 2
    );
}

for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
        distances.push({
            from: i,
            to: j,
            distance: distance3D(boxes[i]!, boxes[j]!),
        });
    }
}

let availableConnections = 1000;
const circuits: Record<number, number> = {};
let nextCircuit = 1;

for (let i = 0; i < availableConnections; i++) {
    const { from, to } = distances.pop()!;

    if (circuits[from] && circuits[to]) {
        const targetCircuit = circuits[to];
        const sourceCircuit = circuits[from];

        for (const key in circuits) {
            if (circuits[key] === targetCircuit) {
                circuits[key] = sourceCircuit;
            }
        }
    } else if (circuits[to]) {
        circuits[from] = circuits[to];
    } else if (circuits[from]) {
        circuits[to] = circuits[from];
    } else {
        circuits[from] = nextCircuit;
        circuits[to] = nextCircuit;
        nextCircuit += 1;
    }
}

console.log(
    Object.values(
        Object.values(circuits).reduce(
            (acc, value) => ({ ...acc, [value]: (acc[value] ?? 0) + 1 }),
            {} as Record<number, number>
        )
    )
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((acc, value) => acc * value, 1)
);
