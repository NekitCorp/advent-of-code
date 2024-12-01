// @ts-check

import { readInput } from "../utils.js";

const input = readInput(import.meta.url);

/**
 * Part.
 * @typedef {{ x: number, m: number, a: number, s: number }} Part
 */
/**
 * Workflow object.
 * @typedef {{
 *     operation: 'more' | 'less';
 *     left: keyof Part;
 *     right: number;
 *     to: string;
 * }} WorkflowObject
 */
/**
 * Workflow.
 * @typedef {WorkflowObject | string} Workflow
 */

/**
 * @param {string} input
 * @returns {{ workflows: Record<string, Workflow[]>, parts: Part[] }}
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
        parts: /** @type {Part[]} */ (
            parts.split("\n").map((part) =>
                part
                    .slice(1, part.length - 1)
                    .split(",")
                    .reduce((acc, val) => {
                        const [k, v] = val.split("=");
                        return { ...acc, [k]: Number(v) };
                    }, {})
            )
        ),
    };
}

/**
 * @param {string} workflowName
 * @param {Record<string, Workflow[]>} workflows
 * @param {Part} part
 * @returns {boolean}
 */
function runWorkflow(workflowName, workflows, part) {
    const steps = workflows[workflowName];

    for (const step of steps) {
        if (typeof step === "string") {
            if (step === "A") {
                return true;
            } else if (step === "R") {
                return false;
            } else {
                return runWorkflow(step, workflows, part);
            }
        } else {
            if (step.operation === "less") {
                if (part[step.left] < step.right) {
                    if (step.to === "A") {
                        return true;
                    } else if (step.to === "R") {
                        return false;
                    } else {
                        return runWorkflow(step.to, workflows, part);
                    }
                }
            } else {
                if (part[step.left] > step.right) {
                    if (step.to === "A") {
                        return true;
                    } else if (step.to === "R") {
                        return false;
                    } else {
                        return runWorkflow(step.to, workflows, part);
                    }
                }
            }
        }
    }

    return false;
}

const { workflows, parts } = parseInput(input);

console.log({ workflows, parts });

let sum = 0;

for (const part of parts) {
    if (runWorkflow("in", workflows, part)) {
        sum += part.a + part.m + part.s + part.x;
    }
}

console.log({ sum });
