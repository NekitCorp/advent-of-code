const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

const data = input.split("\n").map((line) => line.trim().split(/\s+/));

let total = 0;

for (let i = 0; i < data[0]!.length; i++) {
    const op = data[data.length - 1]![i];
    let current = op === "+" ? 0 : 1;

    for (let j = 0; j < data.length - 1; j++) {
        if (op === "+") {
            current += Number(data[j]![i]);
        } else if (op === "*") {
            current *= Number(data[j]![i]);
        }
    }

    total += current;
}

console.log({ total });
