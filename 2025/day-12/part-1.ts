console.time("Execution");

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const parts = input.split("\n\n");
const regions = parts
    .pop()!
    .split("\n")
    .map((line) => {
        const [size, shapes] = line.split(": ");
        const [width, height] = size!.split("x").map(Number);
        return {
            width: width!,
            height: height!,
            area: width! * height!,
            shapes: shapes!.split(" ").map(Number),
        };
    });
const shapes = parts.map((part) => {
    const lines = part.split("\n");
    lines.shift();
    const grid = lines.map((line) => line.split(""));
    let parts = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i]!.length; j++) {
            if (grid[i]![j] === "#") {
                parts += 1;
            }
        }
    }
    return { grid, parts, area: grid.length * grid[0]!.length };
});

let definitelyPossibleGroup = 0;
let definitelyImpossibleGroup = 0;

for (const region of regions) {
    const fullSum = region.shapes.reduce(
        (acc, shape, i) => acc + shape * shapes[i]!.area,
        0
    );

    if (fullSum <= region.area) {
        definitelyPossibleGroup += 1;
        continue;
    }

    const sum = region.shapes.reduce(
        (acc, shape, i) => acc + shape * shapes[i]!.parts,
        0
    );

    if (sum > region.area) {
        definitelyImpossibleGroup += 1;
    }
}

console.timeLog("Execution", {
    definitelyPossibleGroup,
    definitelyImpossibleGroup,
    undetermined:
        regions.length - definitelyPossibleGroup - definitelyImpossibleGroup,
});
