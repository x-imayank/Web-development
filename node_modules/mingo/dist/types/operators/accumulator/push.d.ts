import { AccumulatorOperator } from "../../core";
import { RawArray } from "../../types";
/**
 * Returns an array of all values for the selected field among for each document in that group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {Array|*}
 */
export declare const $push: AccumulatorOperator<RawArray>;
