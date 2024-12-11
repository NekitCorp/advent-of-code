const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const cache: Record<string, number> = {};

function dfs(stone: string, depth: number): number {
    if (cache[`${stone}-${depth}`]) {
        return cache[`${stone}-${depth}`];
    }

    let result = 0;

    if (depth === 0) {
        result = 1;
    } else if (stone === "0") {
        result = dfs("1", depth - 1);
    } else if (stone.length % 2 === 0) {
        result =
            dfs(stone.slice(0, stone.length / 2), depth - 1) +
            dfs(Number(stone.slice(stone.length / 2)).toString(), depth - 1);
    } else {
        result = dfs((Number(stone) * 2024).toString(), depth - 1);
    }

    cache[`${stone}-${depth}`] = result;

    return result;
}

console.log(
    input
        .split(" ")
        .map((stone) => dfs(stone, 75))
        .reduce((a, b) => a + b, 0)
);
