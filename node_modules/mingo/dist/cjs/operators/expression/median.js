"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$median = void 0;
const core_1 = require("../../core");
const median_1 = require("../accumulator/median");
/**
 * Returns an approximation of the median, the 50th percentile, as a scalar value.
 *
 * @param obj The current object
 * @param expr The operator expression
 * @param options Options to use for processing
 * @returns {number}
 */
const $median = (obj, expr, options) => {
    const input = (0, core_1.computeValue)(obj, expr.input, null, options);
    return (0, median_1.$median)(input, { input: "$$CURRENT" }, options);
};
exports.$median = $median;
