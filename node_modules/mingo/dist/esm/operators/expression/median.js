import { computeValue } from "../../core";
import { $median as __median } from "../accumulator/median";
/**
 * Returns an approximation of the median, the 50th percentile, as a scalar value.
 *
 * @param obj The current object
 * @param expr The operator expression
 * @param options Options to use for processing
 * @returns {number}
 */
export const $median = (obj, expr, options) => {
    const input = computeValue(obj, expr.input, null, options);
    return __median(input, { input: "$$CURRENT" }, options);
};
