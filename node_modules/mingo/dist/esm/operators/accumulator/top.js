import { $topN } from "./topN";
/**
 * Returns the top element within a group according to the specified sort order.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export const $top = (collection, expr, options) => $topN(collection, Object.assign(Object.assign({}, expr), { n: 1 }), options);
