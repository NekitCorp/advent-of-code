const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const leftList = [];
const rightList = [];

for (const pair of input.split("\n")) {
    const [left, right] = pair.split("   ");
    leftList.push(Number(left));
    rightList.push(Number(right));
}

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

let result = 0;

for (let i = 0; i < leftList.length; i++) {
    result += Math.abs(leftList[i] - rightList[i]);
}

console.log(result);
