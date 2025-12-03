const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

let sum = 0;

for (const line of input.split("\n")) {
    let leftMax = 0,
        leftMaxIndex = 0,
        rightMax = 0;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const num = Number(char);

        if (num > leftMax && i !== line.length - 1) {
            leftMax = num;
            leftMaxIndex = i;
            rightMax = Number(line[i + 1]);
        } else if (num > rightMax) {
            rightMax = num;
        }
    }

    sum += leftMax * 10 + rightMax;
}

console.log({ sum });
