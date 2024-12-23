const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const connections = input.split("\n").map((line) => line.split("-"));

/**
 * Bron–Kerbosch algorithm
 * ```
 * algorithm BronKerbosch1(R, P, X) is
 *     if P and X are both empty then
 *         report R as a maximal clique
 *     for each vertex v in P do
 *         BronKerbosch1(R ⋃ {v}, P ⋂ N(v), X ⋂ N(v))
 *         P := P \ {v}
 *         X := X ⋃ {v}
 * ```
 * @see https://en.wikipedia.org/wiki/Bron%E2%80%93Kerbosch_algorithm
 */
function bronKerbosch(
    R: Set<string>,
    P: Set<string>,
    X: Set<string>,
    N: Record<string, Set<string>>,
    cliques: Set<string>[]
): void {
    if (P.size === 0 && X.size === 0) {
        cliques.push(R);
        return;
    }

    for (const v of P) {
        bronKerbosch(R.union(new Set([v])), P.intersection(N[v]), X.intersection(N[v]), N, cliques);
        P.delete(v);
        X.add(v);
    }
}

function findMaxClique(edges: string[][]): Set<string>[] {
    const adjacencyList: Record<string, Set<string>> = {};

    for (const [u, v] of edges) {
        if (!adjacencyList[u]) adjacencyList[u] = new Set<string>();
        if (!adjacencyList[v]) adjacencyList[v] = new Set<string>();
        adjacencyList[u].add(v);
        adjacencyList[v].add(u);
    }

    const nodes = new Set(Object.keys(adjacencyList));
    const cliques: Set<string>[] = [];

    bronKerbosch(new Set<string>(), nodes, new Set<string>(), adjacencyList, cliques);

    return cliques;
}

const cliques = findMaxClique(connections);
let max = 0;
let maxClique: string[] = [];

for (const clique of cliques) {
    if (clique.size > max) {
        max = clique.size;
        maxClique = Array.from(clique);
    }
}

console.log(maxClique.sort().join(","));
