// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);

/**
 * Part.
 * @typedef {{ x: number, m: number, a: number, s: number }} Part
 */
/**
 * Part range.
 * @typedef {{
 *   x: [number, number],
 *   m: [number, number],
 *   a: [number, number],
 *   s: [number, number],
 * }} PartRange
 */
/**
 * Workflow object.
 * @typedef {{
 *   operation: 'more' | 'less';
 *   left: keyof Part;
 *   right: number;
 *   to: string;
 * }} WorkflowObject
 */
/**
 * Workflow.
 * @typedef {WorkflowObject | string} Workflow
 */

/**
 * @param {string} input
 * @returns {{ workflows: Record<string, Workflow[]> }}
 */
function parseInput(input) {
    const [workflows, parts] = input.split(/\n\s*\n/);

    return {
        workflows: workflows.split("\n").reduce((acc, val) => {
            const [name, rest] = val.split("{");
            const conditions = rest
                .slice(0, rest.length - 1)
                .split(",")
                .reduce((acc, cond) => {
                    if (cond.includes(":")) {
                        const [c, to] = cond.split(":");

                        if (c.includes(">")) {
                            const [left, right] = c.split(">");
                            return [...acc, { operation: "more", left, right: Number(right), to }];
                        } else {
                            const [left, right] = c.split("<");
                            return [...acc, { operation: "less", left, right: Number(right), to }];
                        }
                    } else {
                        return [...acc, cond];
                    }
                }, []);

            return { ...acc, [name]: conditions };
        }, {}),
    };
}

/**
 * @param {PartRange} range
 * @returns {number}
 */
function sumRange(range) {
    let sum = 1;

    for (const [from, to] of Object.values(range)) {
        sum *= to - from + 1;
    }

    return sum;
}

/**
 * @param {PartRange} range
 * @returns {PartRange}
 */
function deepClone(range) {
    const newRange = {};

    for (const key of Object.keys(range)) {
        newRange[key] = [range[key][0], range[key][1]];
    }

    return newRange;
}

/**
 * @param {string} workflowName
 * @param {Record<string, Workflow[]>} workflows
 * @param {PartRange} range
 * @returns {number}
 */
function rangeWorkflow(workflowName, workflows, range) {
    let sum = 0;

    for (const step of workflows[workflowName]) {
        if (typeof step === "string") {
            if (step === "A") {
                sum += sumRange(range);
            } else if (step !== "R") {
                sum += rangeWorkflow(step, workflows, range);
            }
        } else {
            if (step.operation === "more") {
                const newRange = deepClone(range);

                if (range[step.left][1] > step.right) {
                    newRange[step.left][0] = Math.max(range[step.left][0], step.right + 1);

                    if (step.to === "A") {
                        sum += sumRange(newRange);
                    } else if (step.to !== "R") {
                        sum += rangeWorkflow(step.to, workflows, newRange);
                    }

                    range[step.left][1] = Math.min(range[step.left][1], step.right);
                }
            }

            if (step.operation === "less") {
                const newRange = deepClone(range);

                if (range[step.left][0] < step.right) {
                    newRange[step.left][1] = Math.min(range[step.left][1], step.right - 1);

                    if (step.to === "A") {
                        sum += sumRange(newRange);
                    } else if (step.to !== "R") {
                        sum += rangeWorkflow(step.to, workflows, newRange);
                    }

                    range[step.left][0] = Math.max(range[step.left][0], step.right);
                }
            }
        }
    }

    return sum;
}

const { workflows } = parseInput(input);
const sum = rangeWorkflow("in", workflows, {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
});

console.log({ sum });
