const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const regexp = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
const matches = input.matchAll(regexp);
let result = 0;

for (const match of matches) {
    result += +match[1] * +match[2];
}

console.log({ result });
