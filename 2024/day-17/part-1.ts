const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const [registers, program] = input.split("\n\n");
let [a, b, c] = registers.split("\n").map((r) => +r.split(": ")[1]);
const instructions = program.split(": ")[1].split(",").map(Number);

console.log({ a, b, c, instructions });

function getComboValue(combo: number): number {
    switch (combo) {
        case 4:
            return a;
        case 5:
            return b;
        case 6:
            return c;
        case 7:
            throw new Error("Invalid combo value");
        default:
            return combo;
    }
}

let i = 0;
let output = "";

while (i < instructions.length) {
    const opcode = instructions[i];
    const operand = instructions[i + 1];

    switch (opcode) {
        case 0: {
            a = Math.floor(a / 2 ** getComboValue(operand));
            i += 2;
            break;
        }
        case 1: {
            b = b ^ operand;
            i += 2;
            break;
        }
        case 2: {
            b = getComboValue(operand) % 8;
            i += 2;
            break;
        }
        case 3: {
            if (a === 0) {
                i += 2;
            } else {
                i = operand;
            }
            break;
        }
        case 4: {
            b = b ^ c;
            i += 2;
            break;
        }
        case 5: {
            output += (getComboValue(operand) % 8) + ",";
            i += 2;
            break;
        }
        case 6: {
            b = Math.floor(a / 2 ** getComboValue(operand));
            i += 2;
            break;
        }
        case 7: {
            c = Math.floor(a / 2 ** getComboValue(operand));
            i += 2;
            break;
        }
        default: {
            throw new Error(`Invalid opcode: ${opcode}`);
        }
    }
}

console.log({ a, b, c, output });
