// https://www.mongodb.com/docs/manual/reference/operator/aggregation/minN
import { ComputeOptions, computeValue } from "../../core";
import { compare, isNil } from "../../util";
import { $push } from "./push";
/**
 * Returns an aggregation of the minimum value n elements within a group.
 * If the group contains fewer than n elements, $minN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export const $minN = (collection, expr, options) => {
    var _a;
    const copts = ComputeOptions.init(options);
    const m = collection.length;
    const n = computeValue((_a = copts === null || copts === void 0 ? void 0 : copts.local) === null || _a === void 0 ? void 0 : _a.groupId, expr.n, null, copts);
    const arr = $push(collection, expr.input, options).filter(o => !isNil(o));
    arr.sort(compare);
    return m <= n ? arr : arr.slice(0, n);
};
