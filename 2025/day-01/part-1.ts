const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

let currentPosition = 50;
let zerosCount = 0;

for (const line of input.split("\n")) {
    const dir = line[0];
    const steps = Number(line.slice(1));

    if (dir === "L") {
        currentPosition -= steps;
    } else {
        currentPosition += steps;
    }

    if (currentPosition >= 100) {
        currentPosition %= 100;
    }

    if (currentPosition < 0) {
        currentPosition %= 100;

        if (currentPosition === -0) {
            currentPosition = 0;
        } else {
            currentPosition += 100;
        }
    }

    if (currentPosition === 0) {
        zerosCount++;
    }

    console.log(line, currentPosition);
}

console.log({ zerosCount });
