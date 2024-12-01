import { readInput } from "../utils.js";

type Module =
    | {
          type: "%";
          destination: string[];
          state: "on" | "off";
      }
    | {
          type: "&";
          destination: string[];
          inputs: Record<string, SignalType>;
      }
    | {
          destination: string[];
      };

type SignalType = "high" | "low";

type Signal = {
    type: SignalType;
    to: string;
    from: string;
};

const input = readInput(import.meta.url);
const modules = input.split("\n").reduce<Record<string, Module>>((acc, mod) => {
    const [nameStr, destinationStr] = mod.split(" -> ");
    const destination = destinationStr.split(", ");
    const type = nameStr[0];

    if (type === "%") {
        return {
            ...acc,
            [nameStr.slice(1)]: {
                type,
                destination,
                state: "off",
            },
        };
    } else if (type === "&") {
        return {
            ...acc,
            [nameStr.slice(1)]: {
                type,
                destination,
                inputs: {},
            },
        };
    } else {
        return {
            ...acc,
            broadcaster: {
                destination,
            },
        };
    }
}, {});
for (const key in modules) {
    const mod = modules[key];

    if ("type" in mod && mod.type === "&") {
        for (const iKey in modules) {
            if (modules[iKey].destination.includes(key)) {
                mod.inputs[iKey] = "low";
            }
        }
    }
}

console.log(modules);
console.log("");

function cycle(): [low: number, high: number] {
    // console.log("button -low-> broadcaster");

    let low = 1;
    let high = 0;
    const stack: Signal[] = modules.broadcaster.destination.map((to) => ({
        to,
        type: "low",
        from: "broadcaster",
    }));

    while (stack.length > 0) {
        const { from, to, type } = stack.shift()!;
        const mod = modules[to];

        // console.log(`${from} -${type}-> ${to}`);

        if (type === "low") {
            low += 1;
        } else {
            high += 1;
        }

        if (!mod) {
            continue;
        }

        if ("type" in mod && mod.type === "%") {
            // If a flip-flop module receives a high pulse, it is ignored and nothing happens.
            if (type === "low") {
                for (const dest of mod.destination) {
                    stack.push({ from: to, to: dest, type: mod.state === "on" ? "low" : "high" });
                }
                mod.state = mod.state === "on" ? "off" : "on";
            }
        }

        if ("type" in mod && mod.type === "&") {
            mod.inputs[from] = type;
            const sendType = Object.values(mod.inputs).every((t) => t === "high") ? "low" : "high";
            for (const dest of mod.destination) {
                stack.push({ from: to, to: dest, type: sendType });
            }
        }
    }

    // console.log({ low, high });
    // console.log("");

    return [low, high];
}

let totalLow = 0;
let totalHigh = 0;

for (let i = 0; i < 1000; i++) {
    const [low, high] = cycle();
    totalLow += low;
    totalHigh += high;
}

console.log({ totalLow, totalHigh, result: totalLow * totalHigh });
