const input = await Bun.file(`${import.meta.dir}/input.txt`).text();

let safe = 0;

function isSafeReport(report: number[]): boolean {
    let asc = true;

    if (report[0] < report[1]) {
        asc = false;
    }

    for (let i = 0; i < report.length - 1; i++) {
        const diff = Math.abs(report[i] - report[i + 1]);
        if (asc && report[i] < report[i + 1]) return false;
        if (!asc && report[i] > report[i + 1]) return false;
        if (diff < 1 || diff > 3) return false;
    }

    return true;
}

for (const line of input.split("\n")) {
    const report = line.split(" ").map(Number);

    for (let i = 0; i < report.length; i++) {
        if (isSafeReport(report.filter((_, j) => i !== j))) {
            safe += 1;
            break;
        }
    }
}

console.log({ safe });
