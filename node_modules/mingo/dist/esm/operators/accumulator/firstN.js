// https://www.mongodb.com/docs/manual/reference/operator/aggregation/firstN/
import { ComputeOptions, computeValue } from "../../core";
import { $push } from "./push";
/**
 * Returns an aggregation of the first n elements within a group. The elements returned are meaningful only if in a specified sort order.
 * If the group contains fewer than n elements, $firstN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export const $firstN = (collection, expr, options) => {
    var _a;
    const copts = ComputeOptions.init(options);
    const m = collection.length;
    const n = computeValue((_a = copts === null || copts === void 0 ? void 0 : copts.local) === null || _a === void 0 ? void 0 : _a.groupId, expr.n, null, copts);
    return $push(m <= n ? collection : collection.slice(0, n), expr.input, options);
};
