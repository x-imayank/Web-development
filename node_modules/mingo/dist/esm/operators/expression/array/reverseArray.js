// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
import { computeValue } from "../../../core";
import { assert, isArray, isNil } from "../../../util";
/**
 * Returns an array with the elements in reverse order.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
export const $reverseArray = (obj, expr, options) => {
    const arr = computeValue(obj, expr, null, options);
    if (isNil(arr))
        return null;
    assert(isArray(arr), "$reverseArray expression must resolve to an array");
    const result = arr.slice(0);
    result.reverse();
    return result;
};
