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
    console.time(machine.joltage.join(","));
    const result = solve(machine);
    sum += result;
    console.timeLog(machine.joltage.join(","), result);
}

console.timeLog("Execution", { sum });

function solve(machine: Machine): number {
    let min = Infinity;

    function dfs(state: number[], steps: number, buttons: number[][]): void {
        if (state.some((value) => value < 0)) {
            return;
        }

        const stepsLeft = Math.max(...state);

        if (stepsLeft === 0) {
            min = Math.min(min, steps);
            return;
        }

        if (steps + stepsLeft >= min) {
            return;
        }

        // Optimization. Is there a button we have to press?
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state.length; j++) {
                if (state[i]! > state[j]!) {
                    const usefulButtons = buttons.filter(
                        (b) => b.includes(i) && !b.includes(j)
                    );

                    if (usefulButtons.length === 0) {
                        return;
                    }

                    if (usefulButtons.length === 1) {
                        let nextState: number[] = state.slice();

                        for (const i of usefulButtons[0]!) {
                            nextState[i]! -= 1;
                        }

                        dfs(nextState, steps + 1, buttons);

                        return;
                    }
                }
            }
        }

        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i]!;
            let nextState: number[] = state.slice();

            for (const i of button) {
                nextState[i]! -= 1;
            }

            dfs(nextState, steps + 1, buttons.slice(i));
        }
    }

    dfs(machine.joltage.slice(), 0, machine.buttons);

    return min;
}
