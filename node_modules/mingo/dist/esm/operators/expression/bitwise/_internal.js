import { computeValue } from "../../../core";
import { assert, isArray, isNil, isNumber } from "../../../util";
export const bitwise = (op, compute) => (obj, expr, options) => {
    assert(isArray(expr), `${op}: expression must be an array.`);
    const nums = computeValue(obj, expr, null, options);
    if (nums.some(isNil))
        return null;
    assert(nums.every(isNumber), `${op}: expression must evalue to array of numbers.`);
    return compute(nums);
};
