/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { computeValue } from "../../../core";
import { intersection } from "../../../util";
/**
 * Returns true if all elements of a set appear in a second set.
 * @param obj
 * @param expr
 */
export const $setIsSubset = (obj, expr, options) => {
    const args = computeValue(obj, expr, null, options);
    return intersection(args, options === null || options === void 0 ? void 0 : options.hashFunction).length === args[0].length;
};
