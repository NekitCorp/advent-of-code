const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

let sum = 0;

for (const range of input.split(",")) {
    const [first, last] = range.split("-");

    for (let i = Number(first); i <= Number(last); i++) {
        const str = i.toString();

        if (str.length % 2 !== 0) continue;

        const middle = str.length / 2;
        const left = str.slice(0, middle);
        const right = str.slice(middle);

        if (left === right) {
            sum += i;
        }
    }
}

console.log({ sum });
