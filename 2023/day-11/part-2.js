// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);
const lines = input.split("\n");
const MULTIPLIER = 1_000_000 - 1;

const expandY = [];

for (let i = 0; i < lines.length; i++) {
    if (lines[i].split("").every((c) => c === ".")) {
        expandY.push(i);
    }
}

const expandX = [];

for (let i = 0; i < lines[0].length; i++) {
    let valid = true;

    for (let j = 0; j < lines.length; j++) {
        if (lines[j][i] !== ".") {
            valid = false;
            break;
        }
    }

    if (valid) {
        expandX.push(i);
    }
}

console.log({ expandY, expandX });

const galaxies = [];

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === "#") {
            galaxies.push([i, j]);
        }
    }
}

console.log({ galaxies });
console.log("===================================================================");

let sum = 0;

for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        const galaxyFrom = galaxies[i];
        const galaxyTo = galaxies[j];
        const minX = Math.min(galaxyFrom[1], galaxyTo[1]);
        const maxX = Math.max(galaxyFrom[1], galaxyTo[1]);
        const minY = Math.min(galaxyFrom[0], galaxyTo[0]);
        const maxY = Math.max(galaxyFrom[0], galaxyTo[0]);
        const additionalX = expandX.filter((x) => x > minX && x < maxX).length * MULTIPLIER;
        const additionalY = expandY.filter((y) => y > minY && y < maxY).length * MULTIPLIER;

        // console.log({ additionalX, additionalY, minX, maxX, minY, maxY });

        const newMaxX = maxX + additionalX;
        const newMaxY = maxY + additionalY;

        // console.log({ newMaxX, newMaxY });

        const dist = newMaxX - minX + (newMaxY - minY);
        sum += dist;

        // console.log(`${i + 1} -> ${j + 1} = ${dist}`);
    }
}

console.log({ sum });

// 71497490 – is too low
