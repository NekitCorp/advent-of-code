// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const [instructions, network] = input.split(/\n\s*\n/);

const map = network.split("\n").reduce((acc, val) => {
    const [from, to] = val.split(" = ");
    const [left, right] = to.slice(1, to.length - 1).split(", ");

    acc[from] = { L: left, R: right };

    return acc;
}, {});

let currents = Object.keys(map).filter((node) => node.endsWith("A"));
const result = [];

for (let i = 0; i < currents.length; i++) {
    let steps = 0;

    while (!currents[i].endsWith("Z")) {
        const direction = instructions[steps % instructions.length];
        currents[i] = map[currents[i]][direction];
        steps += 1;
    }

    result[i] = steps;
}

console.log({ result });

// Least common multiple

const gcd = (a, b) => {
    // Euclidean algorithm
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

const lcm = (a, b) => {
    return (a * b) / gcd(a, b);
};

const lcmm = (nums) => {
    let res = nums[0];
    for (let i = 1; i < nums.length; i++) {
        res = lcm(res, nums[i]);
    }
    return res;
};

console.log(lcmm(result));
