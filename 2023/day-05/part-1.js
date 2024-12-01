// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);

/**
 * @param {string} str
 * @returns {[destination: number, source: number, range: number][]}
 */
function buildMap(str) {
    const maps = [];

    str.split("\n").forEach((line) => {
        maps.push(line.split(" ").map(Number));
    });

    return maps;
}

const maps = input.split(/\n\s*\n/);
const seeds = maps[0].replace("seeds: ", "").split(" ").map(Number);
const seedToSoilMap = buildMap(maps[1].replace("seed-to-soil map:\n", ""));
const soilToFertilizerMap = buildMap(maps[2].replace("soil-to-fertilizer map:\n", ""));
const fertilizerToWaterMap = buildMap(maps[3].replace("fertilizer-to-water map:\n", ""));
const waterToLightMap = buildMap(maps[4].replace("water-to-light map:\n", ""));
const lightToTemperatureMap = buildMap(maps[5].replace("light-to-temperature map:\n", ""));
const temperatureToHumidityMap = buildMap(maps[6].replace("temperature-to-humidity map:\n", ""));
const humidityToLocationMap = buildMap(maps[7].replace("humidity-to-location map:\n", ""));

console.log({ seedToSoilMap });

/**
 *
 * @param {number} value
 * @param {[destination: number, source: number, range: number][]} maps
 * @returns {number}
 */
function getFromMap(value, maps) {
    for (const [destination, source, range] of maps) {
        if (value >= source && value < source + range) {
            return destination + (value - source);
        }
    }

    return value;
}

let min = Number.MAX_SAFE_INTEGER;

for (const seed of seeds) {
    const soil = getFromMap(seed, seedToSoilMap);
    const fertilizer = getFromMap(soil, soilToFertilizerMap);
    const water = getFromMap(fertilizer, fertilizerToWaterMap);
    const light = getFromMap(water, waterToLightMap);
    const temperature = getFromMap(light, lightToTemperatureMap);
    const humidity = getFromMap(temperature, temperatureToHumidityMap);
    const location = getFromMap(humidity, humidityToLocationMap);

    console.log({ seed, soil, fertilizer, water, light, temperature, humidity, location });

    min = Math.min(min, location);
}

console.log({ min });
