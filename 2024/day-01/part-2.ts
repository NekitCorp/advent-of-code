const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const leftList = [];
const rightMap: Record<string, number> = {};

for (const pair of input.split("\n")) {
    const [left, right] = pair.split("   ");
    leftList.push(Number(left));
    rightMap[right] = (rightMap[right] ?? 0) + 1;
}

let result = 0;

for (const left of leftList) {
    result += left * (rightMap[left] ?? 0);
}

console.log(result);
