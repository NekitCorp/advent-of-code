console.time("Execution");

const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

type Machine = {
    state: string[];
    buttons: number[][];
    joltage: number[];
};

const machines: Machine[] = input.split("\n").map<Machine>((line) => {
    const [state, ...rest] = line.split(" ");

    return {
        state: state!.slice(1, -1).split(""),
        buttons: rest
            .slice(0, -1)
            .map((b) => b.slice(1, -1).split(",").map(Number)),
        joltage: rest.at(-1)!.slice(1, -1).split(",").map(Number),
    };
});

let sum = 0;

for (const machine of machines) {
    sum += dfs(machine);
}

function dfs(machine: Machine): number {
    let min = Infinity;

    const queue: [state: string[], steps: number, lastButtonIndex: number][] = [
        [new Array(machine.state.length).fill("."), 0, -1],
    ];

    while (queue.length > 0) {
        const [state, steps, lastButtonIndex] = queue.shift()!;

        if (steps >= min) {
            continue;
        }

        if (state.join("") === machine.state.join("")) {
            if (steps < min) {
                min = steps;
            }
        } else {
            for (let i = 0; i < machine.buttons.length; i++) {
                if (i === lastButtonIndex) {
                    continue;
                }

                let nextState: string[] = state.slice();

                for (const j of machine.buttons[i]!) {
                    nextState[j] = nextState[j] === "." ? "#" : ".";
                }

                queue.push([nextState, steps + 1, i]);
            }
        }
    }

    return min;
}

console.timeLog("Execution", { sum });
