// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
import { computeValue } from "../../../core";
import { assert, isArray, isEqual } from "../../../util";
/**
 * Returns a boolean indicating whether a specified value is in an array.
 *
 * @param {Object} obj
 * @param {Array} expr
 */
export const $in = (obj, expr, options) => {
    const [item, arr] = computeValue(obj, expr, null, options);
    assert(isArray(arr), "$in second argument must be an array");
    return arr.some(isEqual.bind(null, item));
};
