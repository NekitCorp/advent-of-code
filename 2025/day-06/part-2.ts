const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const lines = input.split("\n");

let numbers: number[] = [];
let total = 0;

for (let i = lines[0]!.length - 1; i >= 0; i--) {
    let current = "";

    for (let j = 0; j < lines.length - 1; j++) {
        current += lines[j]![i];
    }

    current = current.trim();

    if (current.trim() !== "") {
        numbers.push(Number(current));
    }

    if (["*", "+"].includes(lines[lines.length - 1]![i]!)) {
        const op = lines[lines.length - 1]![i]!;

        if (op === "*") {
            total += numbers.reduce((acc, num) => acc * num, 1);
        } else if (op === "+") {
            total += numbers.reduce((acc, num) => acc + num, 0);
        }

        numbers = [];
    }
}

console.log({ total });
