import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const bricks: [[x: number, y: number, z: number], [x: number, y: number, z: number]][] = input
    .split("\n")
    .map((line) => line.split("~").map((c) => c.split(",").map(Number)))
    .sort((a, b) => a[0][2] - b[0][2]) as [
    [x: number, y: number, z: number],
    [x: number, y: number, z: number]
][];
const maxX = Math.max(...bricks.map((b) => [b[0][0], b[1][0]]).flat(1)) + 1;
const maxY = Math.max(...bricks.map((b) => [b[0][1], b[1][1]]).flat(1)) + 1;
const maxZ = Math.max(...bricks.map((b) => [b[0][2], b[1][2]]).flat(1)) + 1;
const map: string[][][] = Array(maxX)
    .fill(null)
    .map(() =>
        Array(maxY)
            .fill(null)
            .map(() => Array(maxZ).fill("."))
    );

console.log({ maxX, maxY, maxZ });

function printMapXZ() {
    console.log("x");
    console.log(
        Array.from(Array(maxX).keys()).join("") + " " + Array.from(Array(maxX).keys()).join("")
    );

    for (let z = maxZ - 1; z >= 0; z--) {
        let row1 = "";
        let row2 = "";

        for (let x = 0; x < maxX; x++) {
            row1 += map[x][0][z];
            row2 += map[x][maxY - 1][z];
        }

        console.log(row1 + " " + row2);
    }

    console.log();
}

function printMapYZ() {
    console.log("y");
    console.log(
        Array.from(Array(maxX).keys()).join("") + " " + Array.from(Array(maxX).keys()).join("")
    );

    for (let z = maxZ - 1; z >= 0; z--) {
        let row1 = "";
        let row2 = "";
        for (let y = 0; y < maxY; y++) {
            row1 += map[0][y][z];
            row2 += map[maxX - 1][y][z];
        }

        console.log(row1 + " " + row2);
    }

    console.log();
}

// floor
for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
        map[x][y][0] = "-";
    }
}

function findNewZ(i: number) {
    const brick = bricks[i];

    while (brick[0][2] >= 0) {
        for (let x = brick[0][0]; x <= brick[1][0]; x++) {
            for (let y = brick[0][1]; y <= brick[1][1]; y++) {
                if (map[x][y][brick[0][2]] !== ".") {
                    brick[0][2] += 1;
                    brick[1][2] += 1;

                    return;
                }
            }
        }

        brick[0][2] -= 1;
        brick[1][2] -= 1;
    }

    throw new Error("???");
}

function downBrick(i: number) {
    const brick = bricks[i];
    findNewZ(i);

    for (let x = brick[0][0]; x <= brick[1][0]; x++) {
        for (let y = brick[0][1]; y <= brick[1][1]; y++) {
            for (let z = brick[0][2]; z <= brick[1][2]; z++) {
                map[x][y][z] = i.toString();
            }
        }
    }
}

for (let i = 0; i < bricks.length; i++) {
    downBrick(i);
}

// printMapXZ();
// printMapYZ();

const arr: string[] = [];

for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];

    for (let x = brick[0][0]; x <= brick[1][0]; x++) {
        for (let y = brick[0][1]; y <= brick[1][1]; y++) {
            for (let z = brick[0][2]; z <= brick[1][2]; z++) {
                arr.push(`${x}-${y}-${z}-${i}`);
            }
        }
    }
}

const support: Record<string, Set<string>> = {};

for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];

    support[i] = new Set<string>();

    for (let x = brick[0][0]; x <= brick[1][0]; x++) {
        for (let y = brick[0][1]; y <= brick[1][1]; y++) {
            if (map[x][y][brick[1][2] + 1] !== "." && map[x][y][brick[1][2] + 1] !== i.toString()) {
                support[i].add(map[x][y][brick[1][2] + 1]);
            }
        }
    }
}

let count = 0;

for (let i = 0; i < bricks.length; i++) {
    const gone = new Set([i.toString()]);

    let foundNewOne = true;
    while (foundNewOne) {
        foundNewOne = false;

        for (let goneBrick of gone) {
            for (let other of support[goneBrick]) {
                if (
                    !gone.has(other) &&
                    Object.keys(support)
                        .filter((k) => support[k].has(other))
                        .every((k) => gone.has(k))
                ) {
                    gone.add(other);
                    foundNewOne = true;
                }
            }
        }
    }

    count += gone.size - 1;
}

console.log({ count });
