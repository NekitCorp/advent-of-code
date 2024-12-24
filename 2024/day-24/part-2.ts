const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const [wiresStr, gatesStr] = input.split("\n\n");
const wires: Record<string, number> = wiresStr.split("\n").reduce((acc, line) => {
    const [wire, value] = line.split(": ");
    return { ...acc, [wire]: Number(value) };
}, {});
const gates = gatesStr.split("\n").map((line) => {
    const [input, output] = line.split(" -> ");
    const [input1, operation, input2] = input.split(" ");
    return { input1, operation, input2, output, wait: true };
});

let swapped: string[] = [];

function swap(output1: string, output2: string) {
    swapped.push(output1, output2);

    for (const gate of gates) {
        if (gate.output === output1) {
            gate.output = output2;
        } else if (gate.output === output2) {
            gate.output = output1;
        }
    }
}

// https://dreampuf.github.io/GraphvizOnline/
async function graphviz() {
    let content = "digraph G {\n";
    content += Object.keys(wires).join("\n");
    content += "\n";
    content += gates.map((gate) => `${gate.input1} -> ${gate.output}`).join("\n");
    content += "\n";
    content += gates.map((gate) => `${gate.input2} -> ${gate.output}`).join("\n");
    content += "\n}";

    await Bun.write(`${import.meta.dir}/output.txt`, content);
}

swap("z05", "frn");
swap("z21", "gmq");
swap("z39", "wtt");
swap("vtj", "wnf");
console.log("Swapped: ", swapped.sort().join());

await graphviz();

let waitedGates = gates.length;

const operations: Record<string, (a: number, b: number) => number> = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    XOR: (a, b) => a ^ b,
};

while (waitedGates) {
    for (const gate of gates) {
        if (gate.wait && gate.input1 in wires && gate.input2 in wires) {
            wires[gate.output] = operations[gate.operation](wires[gate.input1], wires[gate.input2]);
            gate.wait = false;
            waitedGates -= 1;
        }
    }
}

function getBinaryNumber(wire: string): string {
    return Object.keys(wires)
        .filter((key) => key.startsWith(wire))
        .sort()
        .reduce((acc, key) => wires[key] + acc, "");
}

const x = getBinaryNumber("x");
const y = getBinaryNumber("y");
const z = getBinaryNumber("z");
const expected = parseInt(x, 2) + parseInt(y, 2);

console.log(`Actual:   ${z} (${parseInt(z, 2)})`);
console.log(`Expected: ${expected.toString(2)} (${expected})`);

for (let i = 0; i < z.length; i++) {
    if (z[i] !== expected.toString(2)[i]) {
        console.log(`Different at bit: ${z.length - i - 1}`);
    }
}
