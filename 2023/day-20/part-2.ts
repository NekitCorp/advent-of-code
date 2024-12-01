import { lcmm, readInput } from "../utils.js";

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

function cycle(i: number, toToRx: Record<string, number[]>): boolean {
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

        if (to === "rx" && type === "low") {
            return true;
        }

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

            if (Object.keys(toToRx).includes(to) && sendType === "high") {
                toToRx[to].push(i);
            }

            for (const dest of mod.destination) {
                stack.push({ from: to, to: dest, type: sendType });
            }
        }
    }

    return false;
}

const toRx = Object.keys(modules).find((modKey) => modules[modKey].destination.includes("rx"))!;
const toToRx = Object.keys(modules)
    .filter((modKey) => modules[modKey].destination.includes(toRx))
    .reduce((acc, val) => ({ ...acc, [val]: [] }), {});

console.log({ toRx, toToRx });

for (let i = 1; i < 100000; i++) {
    const result = cycle(i, toToRx);

    if (result) {
        console.log(i + 1);
        break;
    }
}

const result = lcmm(Object.keys(toToRx).map((key) => toToRx[key][1] - toToRx[key][0]));

console.log({ result });
