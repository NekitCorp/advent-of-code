const input = await Bun.file(`${import.meta.dir}/input.txt`).text();
const stones = input.split(" ");

let queue: string[] = [...stones];

for (let i = 0; i < 25; i++) {
    const newQueue: string[] = [];

    for (const stone of queue) {
        if (stone === "0") {
            newQueue.push("1");
        } else if (stone.length % 2 === 0) {
            newQueue.push(stone.slice(0, stone.length / 2), Number(stone.slice(stone.length / 2)).toString());
        } else {
            newQueue.push((Number(stone) * 2024).toString());
        }
    }

    queue = newQueue;
}

console.log(queue.length);
