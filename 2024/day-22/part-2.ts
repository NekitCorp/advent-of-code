const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const initialSecretNumbers = input.split("\n").map(BigInt);

function f(num: bigint): bigint {
    num = num ^ ((num << 6n) & 0xffffffn);
    num = num ^ ((num >> 5n) & 0xffffffn);
    return num ^ ((num << 11n) & 0xffffffn);
}

const map: Record<string, number> = {};

for (let num of initialSecretNumbers) {
    const nums = [num];

    for (let i = 0; i < 2000; i++) {
        num = f(num);
        nums.push(num);
    }

    const diffs = [];

    for (let i = 0; i < nums.length - 1; i++) {
        diffs.push((nums[i + 1] % 10n) - (nums[i] % 10n));
    }

    const seen = new Set();

    for (let i = 0; i < nums.length - 4; i++) {
        const sequence = diffs.slice(i, i + 4).join(",");

        if (!seen.has(sequence)) {
            seen.add(sequence);
            map[sequence] = (map[sequence] || 0) + Number(nums[i + 4] % 10n);
        }
    }
}

console.log(Math.max(...Object.values(map)));
