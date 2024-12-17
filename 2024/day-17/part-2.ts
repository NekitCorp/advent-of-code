const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const [registers, program] = input.split("\n\n");
let [a, b, c] = registers.split("\n").map((r) => +r.split(": ")[1]);
const instructions = program.split(": ")[1].split(",").map(Number);

console.log({ a, b, c, instructions });

function runProgram(a: bigint, b: bigint, c: bigint, instructions: number[]) {
    let i = 0;
    let output: bigint[] = [];

    function getComboValue(combo: number): bigint {
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
                return BigInt(combo);
        }
    }

    while (i < instructions.length) {
        const opcode = instructions[i];
        const operand = instructions[i + 1];

        switch (opcode) {
            case 0: {
                a = a / 2n ** getComboValue(operand);
                i += 2;
                break;
            }
            case 1: {
                b = b ^ BigInt(operand);
                i += 2;
                break;
            }
            case 2: {
                b = getComboValue(operand) % 8n;
                i += 2;
                break;
            }
            case 3: {
                if (a === 0n) {
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
                output.push(getComboValue(operand) % 8n);
                i += 2;
                break;
            }
            case 6: {
                b = a / 2n ** getComboValue(operand);
                i += 2;
                break;
            }
            case 7: {
                c = a / 2n ** getComboValue(operand);
                i += 2;
                break;
            }
            default: {
                throw new Error(`Invalid opcode: ${opcode}`);
            }
        }
    }

    return { a, b, c, output };
}

function findA() {
    let minValid = 8n ** 17n;

    function check(depth: number, score: bigint) {
        if (depth === 16) {
            if (score < minValid) {
                minValid = score;
            }

            return;
        }

        for (let i = 0; i < 8; i++) {
            if (
                runProgram(BigInt(i) + 8n * score, BigInt(b), BigInt(c), instructions).output[0] ===
                BigInt(instructions[15 - depth])
            ) {
                check(depth + 1, BigInt(i) + 8n * score);
            }
        }
    }

    check(0, 0n);

    return minValid;
}

console.log(findA());
