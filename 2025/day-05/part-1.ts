const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const [rangesPart, idsPart] = input.split("\n\n");

const ranges = rangesPart!
    .split("\n")
    .map((line) => line.split("-").map(Number) as [number, number]);

const ids = idsPart!.split("\n").map(Number);

let count = 0;

for (const id of ids) {
    const range = ranges.find((range) => id >= range[0] && id <= range[1]);
    if (range) {
        count += 1;
    }
}

console.log({ count });
