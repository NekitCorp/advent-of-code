const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const [towelsLine, designsStr] = input.split("\n\n");
const towels = towelsLine.split(", ");
const designs = designsStr.split("\n");

const memo: Record<string, number> = {};

function dfs(target: string, towels: string[]): number {
    if (target === "") {
        return 1;
    }

    if (target in memo) {
        return memo[target];
    }

    let count = 0;

    for (const towel of towels) {
        if (target.startsWith(towel)) {
            count += dfs(target.slice(towel.length), towels);
        }
    }

    return (memo[target] = count);
}

let count = 0;

for (const design of designs) {
    count += dfs(design, towels);
}

console.log({ count });
