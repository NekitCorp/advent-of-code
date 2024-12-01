import { readInput, writeOutput } from "../utils.js";

const input = readInput(import.meta.url);
let links: string[][] = [];
const connections: Record<string, string[]> = input.split("\n").reduce((acc, row) => {
    const [from, tos] = row.split(": ");

    if (!acc[from]) {
        acc[from] = [];
    }

    for (const to of tos.split(" ")) {
        acc[from].push(to);

        if (!acc[to]) {
            acc[to] = [];
        }

        links.push([from, to]);
        acc[to].push(from);
    }

    return acc;
}, {});

// Go to https://flourish.studio/ for data visualization.
writeOutput(import.meta.url, Object.keys(connections).join("\n"), "points");
writeOutput(import.meta.url, links.map((link) => link.join(" ")).join("\n"), "links");

function removeLink(from: string, to: string) {
    connections[from] = connections[from].filter((point) => point !== to);
    connections[to] = connections[to].filter((point) => point !== from);
    links = links.filter(
        (link) => !((link[0] === from && link[1] === to) || (link[1] === from && link[0] === to))
    );
}

removeLink("xnn", "txf");
removeLink("jjn", "nhg");
removeLink("lms", "tmc");

function groupCount(from: string): number {
    const set = new Set<string>();
    const queue: string[] = [from];

    set.add(from);

    while (queue.length > 0) {
        const point = queue.pop()!;

        for (const to of connections[point]) {
            if (set.has(to)) continue;
            set.add(to);
            queue.push(to);
        }
    }

    return set.size;
}

const group1 = groupCount("xnn");
const group2 = groupCount("txf");

console.log(`${group1} * ${group2} = ${group1 * group2}`);
