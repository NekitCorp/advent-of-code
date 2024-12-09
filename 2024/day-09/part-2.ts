const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const blocks = [];
const filesMap: Record<number, [from: number, to: number]> = {};
const spaces: [from: number, to: number][] = [];

for (let i = 0, k = 0; i < input.length; i++) {
    if (input[i] === "0") {
        continue;
    } else if (i % 2 === 0) {
        blocks.push(...Array(Number(input[i])).fill(i / 2));
        filesMap[i / 2] = [k, k + Number(input[i]) - 1];
    } else {
        blocks.push(...Array(Number(input[i])).fill(-1));
        spaces.push([k, k + Number(input[i]) - 1]);
    }

    k += Number(input[i]);
}

const ids = Object.keys(filesMap)
    .map(Number)
    .sort((a, b) => b - a);

for (const id of ids) {
    const [fFrom, fTo] = filesMap[id];
    const fileLength = fTo - fFrom + 1;

    for (const space of spaces) {
        const [sFrom, sTo] = space;
        const spaceLength = sTo - sFrom + 1;

        if (fFrom < sFrom) continue;

        if (spaceLength >= fileLength) {
            for (let i = sFrom; i < sFrom + fileLength; i++) {
                blocks[i] = id;
            }
            for (let i = fFrom; i <= fTo; i++) {
                blocks[i] = -1;
            }
            space[0] = sFrom + fileLength;
            break;
        }
    }
}

let checksum = 0;

for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] !== -1) {
        checksum += blocks[i] * i;
    }
}

console.log({ checksum });
