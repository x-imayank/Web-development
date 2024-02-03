import { AccumulatorOperator } from "../../core";
/**
 * Returns an aggregation of the last n elements within a group. The elements returned are meaningful only if in a specified sort order.
 * If the group contains fewer than n elements, $lastN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export declare const $lastN: AccumulatorOperator;
