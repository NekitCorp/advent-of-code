// @ts-check

import { job, start, stop } from "microjob"; // https://github.com/nairihar/funthreads ???
import { readInput } from "../utils.js";

const input = readInput(import.meta.url);

const maps = input.split(/\n\s*\n/);

(async () => {
    try {
        // start the worker pool
        await start({ maxWorkers: 10 });

        const promises = [];

        for (let i = 0; i < 20; i += 2) {
            // this function will be executed in another thread
            const res = job(
                ({ i, maps }) => {
                    let min = Number.MAX_SAFE_INTEGER;

                    const seeds = maps[0].replace("seeds: ", "").split(" ").map(Number);
                    console.log(`${i}/${seeds.length}`);
                    const seedToSoilMap = buildMap(maps[1].replace("seed-to-soil map:\n", ""));
                    const soilToFertilizerMap = buildMap(
                        maps[2].replace("soil-to-fertilizer map:\n", "")
                    );
                    const fertilizerToWaterMap = buildMap(
                        maps[3].replace("fertilizer-to-water map:\n", "")
                    );
                    const waterToLightMap = buildMap(maps[4].replace("water-to-light map:\n", ""));
                    const lightToTemperatureMap = buildMap(
                        maps[5].replace("light-to-temperature map:\n", "")
                    );
                    const temperatureToHumidityMap = buildMap(
                        maps[6].replace("temperature-to-humidity map:\n", "")
                    );
                    const humidityToLocationMap = buildMap(
                        maps[7].replace("humidity-to-location map:\n", "")
                    );

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

                    for (let seed = seeds[i]; seed < seeds[i] + seeds[i + 1]; seed++) {
                        if (seed % 10000000 === 0) {
                            console.log(`${seed}/${seeds[i] + seeds[i + 1]}`);
                        }

                        const soil = getFromMap(seed, seedToSoilMap);
                        const fertilizer = getFromMap(soil, soilToFertilizerMap);
                        const water = getFromMap(fertilizer, fertilizerToWaterMap);
                        const light = getFromMap(water, waterToLightMap);
                        const temperature = getFromMap(light, lightToTemperatureMap);
                        const humidity = getFromMap(temperature, temperatureToHumidityMap);
                        const location = getFromMap(humidity, humidityToLocationMap);

                        min = Math.min(min, location);
                    }

                    console.log({ min });

                    return min;
                },
                { data: { i, maps } }
            );

            promises.push(res);
        }

        const result = await Promise.all(promises);
        console.log({ result });
    } catch (err) {
        console.error(err);
    } finally {
        // shutdown worker pool
        await stop();
    }
})();

// 702443113
// 2491050754
// 1169277931
// 800883183
// 2355386760
// 1069644087
// 183085156
// 125742456
// 650827277
// 919469344

// {
//     result: [
//        702443113,  800883183,
//        183085156, 1069644087,
//       2491050754, 2355386760,
//        125742456, 1169277931,
//        650827277,  919469344
//     ]
//   }
