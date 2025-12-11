console.time("Execution");

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const outputs = input.split("\n").reduce((acc, line) => {
    const [from, rest] = line.split(": ");
    acc[from!] = rest!.split(" ");
    return acc;
}, {} as Record<string, string[]>);

const cache: Record<string, number> = {};

function dfs(device: string): number {
    if (device === "out") {
        return 1;
    }

    if (cache[device]) {
        return cache[device];
    }

    let result = 0;

    for (const output of outputs[device]!) {
        result += dfs(output);
    }

    cache[device] = result;

    return result;
}

console.timeLog("Execution", { total: dfs("you") });
