const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const initialSecretNumbers = input.split("\n").map(BigInt);

function mix(value: bigint, secretNumber: bigint): bigint {
    return value ^ secretNumber;
}

function prune(value: bigint): bigint {
    return value % 16777216n;
}

function step1(value: bigint): bigint {
    let nextValue = value * 64n;
    nextValue = mix(value, nextValue);
    nextValue = prune(nextValue);
    return nextValue;
}

function step2(value: bigint): bigint {
    let nextValue = value / 32n;
    nextValue = mix(value, nextValue);
    nextValue = prune(nextValue);
    return nextValue;
}

function step3(value: bigint): bigint {
    let nextValue = value * 2048n;
    nextValue = mix(value, nextValue);
    nextValue = prune(nextValue);
    return nextValue;
}

function next(value: bigint): bigint {
    let nextValue = step1(value);
    nextValue = step2(nextValue);
    nextValue = step3(nextValue);
    return nextValue;
}

let sum = 0n;

for (let secretNumber of initialSecretNumbers) {
    for (let i = 0; i < 2000; i++) {
        secretNumber = next(secretNumber);
    }

    sum += secretNumber;
}

console.log({ sum });
