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

const binaryNumber = Object.keys(wires)
    .filter((key) => key.startsWith("z"))
    .sort()
    .reduce((acc, key) => wires[key] + acc, "");

console.log(binaryNumber, parseInt(binaryNumber, 2));
