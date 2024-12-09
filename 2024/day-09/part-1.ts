const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const blocks = [];

for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
        blocks.push(...Array(Number(input[i])).fill(i / 2));
    } else {
        blocks.push(...Array(Number(input[i])).fill(-1));
    }
}

for (let l = 0, r = blocks.length - 1; l < r; l++) {
    if (blocks[l] !== -1) continue;
    while (blocks[r] === -1) r -= 1;
    if (l >= r) break;
    [blocks[l], blocks[r]] = [blocks[r], blocks[l]];
}

let checksum = 0;

for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === -1) break;
    checksum += blocks[i] * i;
}

console.log(blocks.map((i) => (i === -1 ? "." : i)).join(""));
console.log({ checksum });
