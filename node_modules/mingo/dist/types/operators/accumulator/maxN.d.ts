import { AccumulatorOperator } from "../../core";
/**
 * Returns an aggregation of the maxmimum value n elements within a group.
 * If the group contains fewer than n elements, $maxN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
export declare const $maxN: AccumulatorOperator;
