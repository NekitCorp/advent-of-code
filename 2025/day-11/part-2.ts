console.time("Execution");

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const outputs = input.split("\n").reduce((acc, line) => {
    const [from, rest] = line.split(": ");
    acc[from!] = rest!.split(" ");
    return acc;
}, {} as Record<string, string[]>);

const cache = new Map<string, number>();

function dfs(device: string, fft: boolean, dac: boolean): number {
    if (device === "out") {
        return fft && dac ? 1 : 0;
    }

    const key = `${device}-${fft}-${dac}`;

    if (cache.has(key)) {
        return cache.get(key)!;
    }

    let result = 0;

    for (const output of outputs[device]!) {
        result += dfs(output, fft || device === "fft", dac || device === "dac");
    }

    cache.set(key, result);

    return result;
}

console.timeLog("Execution", { total: dfs("svr", false, false) });
