const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

let result = 0;

for (const line of input.split("\n")) {
    const [testStr, numbersStr] = line.split(":");
    const test = Number(testStr);
    const numbers = numbersStr.split(" ").map(Number);

    if (dfs(test, numbers, 0, 0)) {
        result += test;
    }
}

function dfs(test: number, numbers: number[], index: number, sum: number): boolean {
    if (index === numbers.length) {
        return sum === test;
    }

    if (sum > test) {
        return false;
    }

    return dfs(test, numbers, index + 1, sum + numbers[index]) || dfs(test, numbers, index + 1, sum * numbers[index]);
}

console.log({ result });
