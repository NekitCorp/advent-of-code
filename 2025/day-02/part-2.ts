const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

let sum = 0;

for (const range of input.split(",")) {
    const [first, last] = range.split("-");

    for (let i = Number(first); i <= Number(last); i++) {
        const str = i.toString();

        for (let j = 1; j <= str.length / 2; j++) {
            if (check(str, j)) {
                sum += i;
                break;
            }
        }
    }
}

function check(str: string, size: number): boolean {
    let pattern = str.slice(0, size);

    for (let i = size; i < str.length; i += size) {
        if (str.slice(i, i + size) !== pattern) {
            return false;
        }
    }

    return true;
}

console.log({ sum });
