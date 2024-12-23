const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const connections = input.split("\n").map((line) => line.split("-"));

const computers: Record<string, string[]> = {};

for (const [a, b] of connections) {
    if (!computers[a]) computers[a] = [];
    computers[a].push(b);
    if (!computers[b]) computers[b] = [];
    computers[b].push(a);
}

const sets = new Set<string>();

for (const c1 in computers) {
    for (const c2 of computers[c1]) {
        for (const c3 of computers[c1]) {
            if (c2 === c3) continue;
            if (computers[c2].includes(c3) && computers[c3].includes(c2)) {
                sets.add([c1, c2, c3].sort().join("-"));
            }
        }
    }
}

let count = 0;

for (const set of sets) {
    if (set.split("-").some((c) => c.startsWith("t"))) {
        count += 1;
    }
}

console.log({ count });
