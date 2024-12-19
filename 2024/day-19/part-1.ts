const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const [towelsLine, designsStr] = input.split("\n\n");
const towels = towelsLine.split(", ");
const designs = designsStr.split("\n");

const memo: Record<string, boolean> = {};

function dfs(target: string, towels: string[]): boolean {
    if (target in memo) {
        return memo[target];
    }

    for (const towel of towels) {
        if (
            target.startsWith(towel) &&
            (towel === target || dfs(target.slice(towel.length), towels))
        ) {
            return (memo[target] = true);
        }
    }

    return (memo[target] = false);
}

let count = 0;

for (const design of designs) {
    if (dfs(design, towels)) {
        count++;
    }
}

console.log({ count });
