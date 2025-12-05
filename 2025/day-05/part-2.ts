const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const count = input
    .split("\n\n")[0]!
    .split("\n")
    .map((line) => line.split("-").map(Number) as [number, number])
    .sort((a, b) => a[0] - b[0])
    .reduce((acc, [start, end]) => {
        const prev = acc[acc.length - 1];

        if (prev && prev[1] >= start) {
            prev[1] = Math.max(prev[1], end);
        } else {
            acc.push([start, end]);
        }

        return acc;
    }, [] as [number, number][])
    .reduce((acc, [start, end]) => acc + end - start + 1, 0);

console.log({ count });
