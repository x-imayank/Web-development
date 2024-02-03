import { computeValue } from "../../core";
import { $percentile as __percentile } from "../accumulator/percentile";
/**
 * Returns an array of scalar values that correspond to specified percentile values.
 *
 * @param obj The current object
 * @param expr The operator expression
 * @param options Options to use for processing
 * @returns {Array<number>}
 */
export const $percentile = (obj, expr, options) => {
    const input = computeValue(obj, expr.input, null, options);
    return __percentile(input, Object.assign(Object.assign({}, expr), { input: "$$CURRENT" }), options);
};
