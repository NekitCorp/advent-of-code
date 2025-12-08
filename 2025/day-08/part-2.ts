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

const circuits: Record<number, number> = {};
let nextCircuit = 1;

while (distances.size() > 0) {
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

    if (
        Object.values(circuits).length === boxes.length &&
        Object.values(circuits).every((value) => value === circuits[0])
    ) {
        console.log(boxes[from]![0] * boxes[to]![0]);
        break;
    }
}
