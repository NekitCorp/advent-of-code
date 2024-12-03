const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const regexp = /(mul\(([0-9]{1,3}),([0-9]{1,3})\))|(do\(\))|(don\'t\(\))/g;
const matches = input.matchAll(regexp);

let result = 0;
let enabled = true;

for (const match of matches) {
    if (match[0] === "don't()") {
        enabled = false;
    } else if (match[0] === "do()") {
        enabled = true;
    } else if (enabled) {
        result += +match[2] * +match[3];
    }
}

console.log({ result });
