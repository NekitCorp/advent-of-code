const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

let sum = 0;

for (const line of input.split("\n")) {
    sum += Number(maxSubsequence(line, 12));
}

function maxSubsequence(s: string, k: number): string {
    let toRemove = s.length - k;
    const stack: string[] = [];

    for (const c of s) {
        while (stack.length > 0 && c > stack.at(-1)! && toRemove > 0) {
            stack.pop();
            toRemove -= 1;
        }

        stack.push(c);
    }

    return stack.slice(0, k).join("");
}

console.log({ sum });
