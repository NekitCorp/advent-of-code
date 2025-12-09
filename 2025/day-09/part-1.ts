const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const points = input.split("\n").map((line) => line.split(",").map(Number));

let maxArea = 0;

for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i]!;
        const p2 = points[j]!;

        const w = Math.abs(p1[0]! - p2[0]!) + 1;
        const h = Math.abs(p1[1]! - p2[1]!) + 1;

        const area = w * h;

        if (area > maxArea) {
            maxArea = area;
        }
    }
}

console.log({ maxArea });
