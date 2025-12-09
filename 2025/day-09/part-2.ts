const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

type Point = { x: number; y: number };

// Parse points

console.log("Parsing points...");
console.time("Parsing points");

const points = input.split("\n").map((line) => {
    const [y, x] = line.split(",").map(Number);
    return { x, y } as Point;
});

console.timeEnd("Parsing points");

// Compress points

console.log("Compressing points...");
console.time("Compressing points");

type CompressedPoint = { x: number; y: number; realX: number; realY: number };

const allX = points.map((p) => p.x).sort((a, b) => a - b);
const allY = points.map((p) => p.y).sort((a, b) => a - b);

const compressedPoints = points.map<CompressedPoint>((p) => ({
    x: allX.indexOf(p.x) * 2,
    y: allY.indexOf(p.y) * 2,
    realX: p.x,
    realY: p.y,
}));

console.timeEnd("Compressing points");

// Calculate grid size

console.log("Calculating grid size...");
console.time("Calculating grid size");

const xMax = Math.max(...compressedPoints.map((p) => p.x));
const yMax = Math.max(...compressedPoints.map((p) => p.y));

console.timeEnd("Calculating grid size");

// Create grid

console.log("Creating grid...");
console.time("Creating grid");

const grid: boolean[][] = Array(xMax + 1);

for (let i = 0; i < grid.length; i++) {
    grid[i] = Array(yMax + 1).fill(false);
}

console.timeEnd("Creating grid");

// Mark points

console.log("Marking points...");
console.time("Marking points");

for (const point of compressedPoints) {
    grid[point.x]![point.y] = true;
}

console.timeEnd("Marking points");

// Mark lines

console.log("Marking lines...");
console.time("Marking lines");

const compressedPointsSortByY = compressedPoints
    .slice()
    .sort((a, b) => a.y - b.y);
const set1 = new Set<number>();

for (let i = 0; i < compressedPointsSortByY.length; i++) {
    for (let j = i + 1; j < compressedPointsSortByY.length; j++) {
        const p1 = compressedPointsSortByY[i]!;
        const p2 = compressedPointsSortByY[j]!;

        if (p1.x === p2.x && !set1.has(i) && !set1.has(j)) {
            for (let y = Math.min(p1.y, p2.y); y <= Math.max(p1.y, p2.y); y++) {
                grid[p1.x]![y] = true;
            }
            set1.add(i);
            set1.add(j);
            break;
        }
    }
}

const compressedPointsSortByX = compressedPoints
    .slice()
    .sort((a, b) => a.x - b.x);
const set2 = new Set<number>();

for (let i = 0; i < compressedPointsSortByX.length; i++) {
    for (let j = i + 1; j < compressedPointsSortByX.length; j++) {
        const p1 = compressedPointsSortByX[i]!;
        const p2 = compressedPointsSortByX[j]!;

        if (p1.y === p2.y && !set2.has(i) && !set2.has(j)) {
            for (let x = Math.min(p1.x, p2.x); x <= Math.max(p1.x, p2.x); x++) {
                grid[x]![p1.y] = true;
            }
            set2.add(i);
            set2.add(j);
            break;
        }
    }
}

console.timeEnd("Marking lines");

// Flood fill

console.log("Flood filling...");
console.time("Flood filling");

function floodFill(x: number, y: number) {
    const queue: [number, number][] = [[x, y]];

    while (queue.length > 0) {
        const [x, y] = queue.shift()!;

        if (grid[x]?.[y] !== false) {
            continue;
        }

        grid[x]![y] = true;

        queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
}

const startPoint = compressedPoints[0]!;
const startX =
    grid[startPoint.x + 1]![startPoint.y] === true
        ? startPoint.x + 1
        : startPoint.x - 1;
const startY =
    grid[startPoint.x]![startPoint.y + 1] === true
        ? startPoint.y + 1
        : startPoint.y - 1;

floodFill(startX, startY);

console.timeEnd("Flood filling");

// Find max area

console.log("Finding max area...");
console.time("Finding max area");

let maxArea = 0;

for (let i = 0; i < compressedPoints.length; i++) {
    for (let j = i + 1; j < compressedPoints.length; j++) {
        const p1 = compressedPoints[i]!;
        const p2 = compressedPoints[j]!;

        const w = Math.abs(p1.realX - p2.realX) + 1;
        const h = Math.abs(p1.realY - p2.realY) + 1;

        const area = w * h;

        if (area > maxArea && checkArea(p1, p2)) {
            maxArea = area;
        }
    }
}

function checkArea(p1: Point, p2: Point): boolean {
    for (let x = Math.min(p1.x, p2.x); x <= Math.max(p1.x, p2.x); x++) {
        for (let y = Math.min(p1.y, p2.y); y <= Math.max(p1.y, p2.y); y++) {
            if (grid[x]![y] !== true) {
                return false;
            }
        }
    }

    return true;
}

console.timeEnd("Finding max area");

// Result

// await Bun.write(
//     `${import.meta.dir}/output.txt`,
//     grid.map((row) => row.map((cell) => (cell ? "#" : ".")).join("")).join("\n")
// );

console.log({ maxArea });
