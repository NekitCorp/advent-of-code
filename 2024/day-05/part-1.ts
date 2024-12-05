const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const [rulesInput, updatesInput] = input.split("\n\n");

function parseRules(rulesInput: string) {
    const rules: Record<string, number[]> = {};
    rulesInput.split("\n").forEach((rule) => {
        const [left, right] = rule.split("|");
        if (!rules[left]) rules[left] = [];
        rules[left].push(+right);
    });
    return rules;
}

function parseUpdates(updatesInput: string) {
    return updatesInput.split("\n").map((update) => {
        return update.split(",").map(Number);
    });
}

function checkUpdate(update: number[]): boolean {
    for (let i = 0; i < update.length; i++) {
        for (let j = i + 1; j < update.length; j++) {
            if (rules[update[j]]?.includes(update[i])) {
                return false;
            }
        }
    }
    return true;
}

const rules = parseRules(rulesInput);
const updates = parseUpdates(updatesInput);
let result = 0;

for (const update of updates) {
    if (checkUpdate(update)) {
        result += update[Math.floor(update.length / 2)];
    }
}

console.log({ result });
